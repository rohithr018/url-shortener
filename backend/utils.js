const Counter = require("./models/counter.model")

// Base62 character set
const BASE62_CHARSET =
	"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

// Encode number to Base62
function encodeBase62(num) {
	if (num === 0) return "0"
	let result = ""
	while (num > 0) {
		result = BASE62_CHARSET[num % 62] + result
		num = Math.floor(num / 62)
	}
	return result
}

// Generate short code using a counter value, always 6 chars
function generateShortCode(counterValue) {
	const base62 = encodeBase62(counterValue)
	// Pad to 6 characters with leading '0'
	return base62.padStart(6, "0")
}

async function initializeCounter(counterName = "url_count", startValue = 1000000000) {
  try {
    const existing = await Counter.findOne({ name: counterName })
    if (!existing) {
      await Counter.create({ name: counterName, sequenceValue: startValue })
      console.log(`[SUCCESS]:Counter "${counterName}" initialized at ${startValue}`)
    } else {
      console.log(`[INFO]:Counter "${counterName}" already exists with value ${existing.sequenceValue}`)
    }
  } catch (err) {
    console.error("[ERROR]:Failed to initialize counter:", err)
  }
}



// Export all utilities
module.exports = {
	encodeBase62,
	generateShortCode,
	initializeCounter
}
