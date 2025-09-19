const cron = require("node-cron")
const Url = require("../models/url.model")
const redisClient = require("../config/redis")

// Run every 5 minutes
cron.schedule("*/5 * * * *", async () => {
  const now = new Date()
  const expiredDocs = await Url.find({ expireAt: { $lte: now } })

  for (const doc of expiredDocs) {
    await redisClient.rpush("shortcode_pool", doc.shortCode)
    await Url.deleteOne({ _id: doc._id })
    console.log(`Recycled shortCode ${doc.shortCode}`)
  }
})
