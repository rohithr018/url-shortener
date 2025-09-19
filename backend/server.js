const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const redisClient = require("./config/redis")
const urlRoutes = require("./routes/url.routes")
const errorHandler = require("./middlewares/error.middleware")

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const ENV=process.env.NODE_ENV
const BASE_URL = ENV==="PROD"?process.env.BASE_URL : `http://localhost:${PORT}`
const START_TIME = Date.now()
const mongoose = require("mongoose")
let REDIS_STATUS 

// Connect to MongoDB
connectDB()

// Connect to Valkey (Redis-compatible)
redisClient.on("connect", () => {
	console.log("[SUCCESS]: Connected to Redis")
	REDIS_STATUS = "connected"
})
redisClient.on("error", (err) => {
	console.error("[ERROR]: Redis connection error:", err)
	REDIS_STATUS = "disconnected"
})

// Middleware
app.use(cors())
app.use(express.json())

// API Routes
app.use("/api", urlRoutes)

// Health Check
app.get("/health", (req, res) => {
	const UPTIME = ((Date.now() - START_TIME) / 1000).toFixed(2)
	const MONGO_STATUS = (mongoose.connection.readyState === 1) ? "connected" : "disconnected"

	res.status(200).json({
		status: "OK",
		message: "URL Shortener API is running!",
		timestamp: new Date().toISOString(),
		uptime: `${UPTIME}s`,
		env: ENV,
		baseUrl: BASE_URL,
		dependencies: {
			redis: REDIS_STATUS,
			mongodb: MONGO_STATUS
		}
	})
})

// Error Handler
app.use(errorHandler)

// Start Server
app.listen(PORT, () => {
	console.log(`[ENV]:${ENV}`);
	console.log(`[INFO]:Server running on PORT:${PORT}`)
})
