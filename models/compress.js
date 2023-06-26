const mongoose = require("mongoose");

const compressSchema = mongoose.Schema({
    text: { type: String, required: true },
    compressed: { type: String, required: true }
});

module.exports = mongoose.model("Compress", compressSchema);