const mongoose = require("mongoose")
const { v4: uuidv4 } = require("uuid")

const FIFTEEN_DAYS_IN_MS = 15 * 24 * 60 * 60 * 1000

const urlSchema = new mongoose.Schema({
	uuid: {
		type: String,
		default: uuidv4,
		unique: true,
		immutable: true,
	},

	ID: {
		type: Number,
		required: function () {
			return !this.customAlias
		},
		index: true,
	},

	originalUrl: {
		type: String,
		required: true,
		trim: true,
	},

	shortCode: {
		type: String,
		required: true,
		unique: true,
		minlength: 6,
	},

	customAlias: {
		type: String,
		unique: true,
		sparse: true,
		trim: true,
	},

	clickCount: {
		type: Number,
		default: 0,
	},

	analytics: [
		{
			timestamp: {
				type: Date,
				default: Date.now,
			},
			ipAddress: String,
			userAgent: String,
			referrer: String,
			country: String,
		},
	],

	createdAt: {
		type: Date,
		default: Date.now,
		immutable: true,
	},

	expiresAt: {
		type: Date,
		default: () => new Date(Date.now() + FIFTEEN_DAYS_IN_MS),
	},
})

urlSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

module.exports = mongoose.model("Url", urlSchema)
