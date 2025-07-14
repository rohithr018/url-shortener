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

// Connect to MongoDB
connectDB()

// Connect to Valkey (Redis-compatible)
redisClient.on("connect", () => {
	console.log("[SUCCESS]:Connected to Valkey (Redis)")
})
redisClient.on("error", (err) => {
	console.error("[ERROR]:Valkey connection error:", err)
})

// Middleware
app.use(cors())
app.use(express.json())

// API Routes
app.use("/", urlRoutes)

// Health Check
app.get("/", (req, res) => {
	res.send("[INFO]:URL Shortener API is running!")
})

// Error Handler
app.use(errorHandler)

// Start Server
app.listen(PORT, () => {
	console.log(`[INFO]:Server running on http://localhost:${PORT}`)
})
