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
    let location_id = req.params.location_id
    const review = await Reviews.findOne({ location_id: location_id })
    res.status(200).json(review)
})



module.exports = router