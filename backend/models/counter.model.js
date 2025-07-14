const mongoose = require("mongoose")

const counterSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	sequenceValue: {
		type: Number,
		required: true,
		default: 1_000_000_000,
	},
})

module.exports = mongoose.model("Counter", counterSchema)
