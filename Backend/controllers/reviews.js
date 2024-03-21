const router = require('express').Router()
const db = require("../models")

const { Reviews } = db



//get all reviews
router.get('/', async (req, res) => {
    try {
        const allReviews = await Reviews.findAll();
        res.json(allReviews);
    } catch (error) {
        console.error('Error fetching all reviews', error);
        res.status(500).json({ message: 'Error getting all reviews' });
    }
})

// get reviews for specific location
router.get('/:location_id', async (req, res) => {
    let location_id = req.params.location_id;
    const review = await Reviews.findAll({ where: { location_id } });
    res.status(200).json(review)
})

router.post('/', async (req, res) => {
    try {
        const { rating, rating_description, user_id, location_id } = req.body;

        // Check if required fields are present
        if (!rating || !rating_description || !user_id || !location_id) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Validate the rating
        if (isNaN(rating) || rating < 1 || rating > 5) {
            return res.status(400).json({ error: 'Invalid rating value' });
        }

        // Create a new review instance
        const newReview = new Reviews({
            rating,
            rating_description,
            user_id,
            location_id
        });

        // Save the review to the database
        await newReview.save();

        res.status(200).json({ message: 'Review submitted successfully' });
    } catch (error) {
        console.error('Error submitting review:', error);
        if (error.name === 'ValidationError') {
            // Handle validation errors from MongoDB
            return res.status(400).json({ error: 'Validation error', details: error.errors });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
})



module.exports = router