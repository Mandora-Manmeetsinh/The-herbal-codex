const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Plant = require('./models/Plant');

dotenv.config();

const plants = [
    {
        name: 'Tulsi',
        scientificName: 'Ocimum tenuiflorum',
        description: 'Also known as Holy Basil, Tulsi is revered in Ayurveda.',
        benefits: ['Boosts immunity', 'Reduces stress', 'Improves digestion'],
        growthMethod: 'Prefers sunlight and moderate watering.',
        region: 'India',
        imageUrl: 'https://example.com/images/tulsi.jpg'
    },
    {
        name: 'Aloe Vera',
        scientificName: 'Aloe barbadensis miller',
        description: 'Succulent plant with soothing gel used for skin care.',
        benefits: ['Heals burns', 'Improves skin health', 'Aids digestion'],
        growthMethod: 'Thrives in dry, sunny conditions.',
        region: 'Africa',
        imageUrl: 'https://example.com/images/aloe-vera.jpg'
    },
    {
        name: 'Neem',
        scientificName: 'Azadirachta indica',
        description: 'Bitter-leaved tree used in traditional medicine.',
        benefits: ['Detoxifies blood', 'Supports oral health', 'Anti-fungal'],
        growthMethod: 'Needs full sun and well-drained soil.',
        region: 'India',
        imageUrl: 'https://example.com/images/neem.jpg'
    }
];

async function seedDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        await Plant.deleteMany(); // Clear existing data
        await Plant.insertMany(plants);
        console.log('✅ Sample plant data inserted!');
        process.exit();
    } catch (err) {
        console.error('❌ Seeding failed:', err);
        process.exit(1);
    }
}

seedDB();
