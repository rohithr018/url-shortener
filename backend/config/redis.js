// config/redis.js
const Redis = require("ioredis");
const { execSync } = require("child_process");

function runCommand(cmd) {
  try {
    return execSync(cmd, { stdio: "pipe" }).toString().trim();
  } catch {
    return null;
  }
}

function setupLocalRedis() {
  const container = runCommand("docker ps --filter name=redis-local --format '{{.Names}}'");

  if (container === "redis-local") {
    console.log("Local Redis already running");
    return "redis://:localpass@localhost:6379";
  }

  console.log("🚀 Starting local Redis container...");
  runCommand(
    `docker run -d --name redis-local -p 6379:6379 redis:7-alpine redis-server --requirepass localpass`
  );

  return "redis://:localpass@localhost:6379";
}

let redisUrl;

if (process.env.NODE_ENV === "PROD") {
  if (!process.env.REDIS_URL) {
    throw new Error("[FATAL]: REDIS_URL must be set in production!");
  }
  redisUrl = process.env.REDIS_URL;
} else {
  redisUrl = setupLocalRedis();
}

console.log(`[INFO]: Using Redis URL -> ${redisUrl}`);

const redisClient = new Redis(redisUrl);

redisClient.on("connect", () => {
  console.log("[SUCCESS]: Redis connected");
});

redisClient.on("error", (err) => {
  console.error("[ERROR]: Redis connection error:", err);
});

module.exports = redisClient;
