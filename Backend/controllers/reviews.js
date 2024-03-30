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
    const review = await Reviews.findAll({
        where: { location_id },
        include: {
            association: 'author',
            include: 'author'
        }
    });
    res.status(200).json(review)
})

// get a single review
router.get('/:location_id/review/:review_id', async (req, res) => {
    let location_id = req.params.location_id
    let review_id = Number(req.params.review_id)
    const reviews = await Reviews.findOne({
        where: { review_id: review_id, location_id: location_id }
    })
    res.status(200).json(reviews)
})

// post a review
router.post('/:location_id/review', async (req, res) => {
    try {
        const { rating, rating_description } = req.body;

        // Check if required fields are present
        if (!rating || !rating_description) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Validate the rating
        if (isNaN(rating) || rating < 1 || rating > 10) {
            return res.status(400).json({ error: 'Invalid rating value' });
        }

        if (!req.currentUser) {
            return res.status(404).json({ message: `You must be logged in to leave a rant or rave.` })
        }

        const comment = await Comment.create({
            ...req.body,
            author_id: req.currentUser.user_id,
            location_id: location_id
        })
        console.log("comment details ", comment)

        res.send({
            ...comment.toJSON(),
            author: req.currentUser
        })

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

// edit a review
router.put('/:location_id/review/:review_id', async (req, res) => {
    let location_id = Number(req.params.location_id)
    let review_id = Number(req.params.review_id)

    if (isNaN(review_id)) {
        res.status(404).json({ message: `Invalid id "${review_id}"` })
    } else {
        const reviews = await Reviews.find({
            where: { review_id: review_id, location_id: location_id }
        })
        if (!reviews) {
            res.status(404).json({ message: `Could not find comment with id "${review_id}" for place with id "${location_id}"` })



            // uncomment out when ready to try with user token


            // } else if (reviews.user_id !== req.currentUser?.user_id) {
            //     res.status(403).json({ message: `You do not have permission to delete comment "${reviews.review_id}"` })

        } else {
            Object.assign(reviews, req.body)
            await reviews.save()
            res.json(reviews)
        }
    }
})


//delete a review
router.delete('/:location_id/review/:review_id', async (req, res) => {
    let location_id = req.params.location_id
    let review_id = Number(req.params.review_id)

    if (isNaN(review_id)) {
        res.status(404).json({ message: `Invalid id "${review_id}"` })
    } else {
        const reviews = await Reviews.findOne({
            where: { review_id: review_id, location_id: location_id }
        })
        if (!reviews) {
            res.status(404).json({ message: `Could not find comment with id "${review_id}" for place with id "${location_id}"` })


            // uncomment out when ready to try with user token


            // } else if (reviews.user_id !== req.currentUser?.user_id) {
            //     res.status(403).json({ message: `You do not have permission to delete comment "${reviews.review_id}"` })
        } else {
            await reviews.destroy()
            console.log("review deleted")
            res.json(reviews)
        }
    }
})



module.exports = router