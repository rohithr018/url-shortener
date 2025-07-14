const rateLimitMap = new Map()

const MAX_TOKENS = 100      // Maximum tokens allowed per IP     
const REFILL_RATE = 10 / 6                  // 10 tokens per 6 seconds  
const CLEANUP_INTERVAL = 2 * 60 * 60 * 1000 // 2 hours

function rateLimiter(req, res, next) {
	const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.ip
	const now = Date.now()

	let bucket = rateLimitMap.get(ip)

	if (!bucket) {
		bucket = {
			tokens: MAX_TOKENS,
			lastRefill: now,
		}
		rateLimitMap.set(ip, bucket)
	}

	const elapsed = (now - bucket.lastRefill) / 1000
	bucket.tokens = Math.min(MAX_TOKENS, bucket.tokens + elapsed * REFILL_RATE)
	bucket.lastRefill = now

	if (bucket.tokens < 1) {
		return res.status(429).json({
			success: false,
			error: "Too many requests. Please wait and try again.",
		})
	}

	bucket.tokens -= 1
	next()
}

// Cleanup old IPs from memory
setInterval(() => {
	const now = Date.now()
	for (const [ip, bucket] of rateLimitMap.entries()) {
		if (now - bucket.lastRefill > CLEANUP_INTERVAL) {
			rateLimitMap.delete(ip)
		}
	}
}, CLEANUP_INTERVAL)

module.exports = rateLimiter
