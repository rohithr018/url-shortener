const express = require("express")
const router = express.Router()
const {
	createShortUrl,
	redirectToOriginalUrl,
	getGlobalAnalytics,
} = require("../controllers/url.controller")
const rateLimiter = require("../middlewares/rate.middleware")

router.post("/shorten", rateLimiter,createShortUrl)
router.get("/analytics", getGlobalAnalytics)
router.get("/:shortCode", redirectToOriginalUrl)

module.exports = router
