const Redis = require("ioredis")
const dotenv = require("dotenv")

dotenv.config()

// Redis client for Valkey with TLS support
const redisClient = new Redis(process.env.REDIS_URL, {
	tls: {
		rejectUnauthorized: false,
	},
})

module.exports = redisClient
