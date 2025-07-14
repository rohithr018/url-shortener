const Url = require("../models/url.model")
const Counter = require("../models/counter.model")
const redisClient = require("../config/redis")
const { generateShortCode } = require("../utils")
const geoip = require("geoip-lite")

const CACHE_TTL_SECONDS = 2 * 24 * 60 * 60 // 2 days

//create a new short URL
exports.createShortUrl = async (req, res, next) => {
	try {
		const { originalUrl, customAlias } = req.body

		if (!originalUrl) {
			return res.status(400).json({ error: "Original URL is required" })
		}

		const cachedShortCode = await redisClient.get(`original:${originalUrl}`)
		if (cachedShortCode && !customAlias) {
			return res.status(200).json({
				originalUrl,
				shortUrl: `${process.env.BASE_URL}/${cachedShortCode}`,
				shortCode: cachedShortCode,
			})
		}

		let shortCode, ID

		if (customAlias) {
			if (cachedShortCode) {
				return res.status(409).json({
					error: "This URL already has a short code and cannot use a custom alias.",
				})
			}

			const existingAlias = await Url.findOne({ customAlias })
			if (existingAlias) {
				return res.status(409).json({ error: "Custom alias already in use" })
			}

			shortCode = customAlias
			ID = null
		} else {
			const existingDoc = await Url.findOne({ originalUrl, customAlias: null })
			if (existingDoc) {
				await redisClient.set(`original:${originalUrl}`, existingDoc.shortCode, 'EX', CACHE_TTL_SECONDS)
				await redisClient.set(existingDoc.shortCode, originalUrl, 'EX', CACHE_TTL_SECONDS)

				return res.status(200).json({
					originalUrl,
					shortUrl: `${process.env.BASE_URL}/${existingDoc.shortCode}`,
					shortCode: existingDoc.shortCode,
				})
			}

			const counter = await Counter.findOneAndUpdate(
				{ name: "url_count" },
				{ $inc: { sequenceValue: 1 } },
				{ new: true, upsert: true }
			)

			ID = counter.sequenceValue
			shortCode = generateShortCode(ID)
		}

		const newUrl = await Url.create({ originalUrl, shortCode, customAlias, ID })

		await redisClient.set(shortCode, originalUrl, 'EX', CACHE_TTL_SECONDS)
		await redisClient.set(`original:${originalUrl}`, shortCode, 'EX', CACHE_TTL_SECONDS)

		res.status(201).json({
			originalUrl,
			shortUrl: `${process.env.BASE_URL}/${shortCode}`,
			shortCode,
		})
	} catch (error) {
		next(error)
	}
}

// redirect to the original URL
exports.redirectToOriginalUrl = async (req, res, next) => {
	try {
		const { shortCode } = req.params
		let urlDoc, originalUrl

		originalUrl = await redisClient.get(shortCode)

		if (originalUrl) {
			urlDoc = await Url.findOne({ shortCode })
		} else {
			urlDoc = await Url.findOne({ shortCode })

			if (!urlDoc) {
				return res.status(404).json({ error: "Short URL not found or expired" })
			}

			originalUrl = urlDoc.originalUrl
			await redisClient.set(shortCode, originalUrl, 'EX', CACHE_TTL_SECONDS)
		}

		if (!urlDoc) {
			return res.status(404).json({ error: "Short URL not found" })
		}

		const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.ip
		const geo = geoip.lookup(ip)
		const country = geo?.country || "Unknown"

		urlDoc.clickCount += 1
		urlDoc.analytics.push({
			timestamp: new Date(),
			ipAddress: ip,
			userAgent: req.get("User-Agent"),
			referrer: req.get("Referer") || "",
			country,
		})

		await urlDoc.save()

		return res.redirect(originalUrl)
	} catch (error) {
		next(error)
	}
}

//analytics
exports.getGlobalAnalytics = async (req, res, next) => {
	try {
		const urls = await Url.find({}, ["shortCode", "originalUrl", "clickCount", "analytics"]).lean();

		let totalClicks = 0;
		const topUrls = [];
		const clicksByDate = {};
		const hourlyClicks = Array(24).fill(0);
		const countryMap = {};
		const referrerMap = {};
		const userAgentMap = {};

		for (const url of urls) {
			totalClicks += url.clickCount;

			topUrls.push({
				shortCode: url.shortCode,
				originalUrl: url.originalUrl,
				clickCount: url.clickCount,
			});

			for (const entry of url.analytics) {
				const date = new Date(entry.timestamp);
				const dateStr = date.toISOString().slice(0, 10); // "YYYY-MM-DD"
				const hour = date.getHours();

				// Clicks by date
				clicksByDate[dateStr] = (clicksByDate[dateStr] || 0) + 1;

				// Hourly activity
				hourlyClicks[hour]++;

				// Country
				const country = entry.country || "Unknown";
				countryMap[country] = (countryMap[country] || 0) + 1;

				// Referrer
				const ref = entry.referrer || "Direct";
				referrerMap[ref] = (referrerMap[ref] || 0) + 1;

				// User agent
				const agent = entry.userAgent || "Unknown";
				userAgentMap[agent] = (userAgentMap[agent] || 0) + 1;
			}
		}

		// Sort top URLs by clicks
		topUrls.sort((a, b) => b.clickCount - a.clickCount);

		res.status(200).json({
			totalClicks,
			topUrls: topUrls.slice(0, 10),
			clicksByDate,
			hourlyClicks,
			topCountries: countryMap,
			topReferrers: referrerMap,
			topUserAgents: userAgentMap,
		});
	} catch (error) {
		next(error);
	}
};
