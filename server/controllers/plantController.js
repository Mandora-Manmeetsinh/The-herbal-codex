const Plant = require('../models/Plant');

// @desc   Get all plants
exports.getPlants = async (req, res) => {
    try {
        const plants = await Plant.find();
        res.status(200).json(plants);
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
};

// @desc   Add a new plant
exports.createPlant = async (req, res) => {
    try {
        const newPlant = new Plant(req.body);
        await newPlant.save();
        res.status(201).json(newPlant);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
