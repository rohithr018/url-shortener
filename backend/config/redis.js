// config/redis.js
const Redis = require("ioredis");
const { execSync } = require("child_process");

function runCommand(cmd) {
  try {
    return execSync(cmd, { stdio: "pipe" }).toString().trim();
  } catch (err) {
    return null;
  }
}

function setupLocalRedis() {
  const container = runCommand("docker ps --filter name=redis-local --format '{{.Names}}'");

  if (container === "redis-local") {
    console.log("✅ Local Redis already running");
    return "redis://:localpass@localhost:6379";
  }

  console.log("🚀 Starting local Redis container...");
  runCommand(
    `docker run -d --name redis-local -p 6379:6379 redis:7-alpine redis-server --requirepass localpass`
  );

  return "redis://:localpass@localhost:6379";
}

const redisUrl = process.env.REDIS_URL || setupLocalRedis();
const redisClient = new Redis(redisUrl);

module.exports = redisClient;
