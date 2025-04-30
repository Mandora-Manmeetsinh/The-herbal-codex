const mongoose = require('mongoose');

const PlantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    scientificName: String,
    description: String,
    benefits: [String],
    growthMethod: String,
    region: String,
    imageUrl: String
}, { timestamps: true });

module.exports = mongoose.model('Plant', PlantSchema);
