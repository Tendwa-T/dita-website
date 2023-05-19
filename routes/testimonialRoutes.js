const express = require('express');

const {
    createTestimonials,
    getAllTestimonials,
    getSingleTestimonial,
    updateTestimonial,
    deleteTestimonial
}= require('../controllers/testimonialController');
const router = express.Router();

router.get('/', (req, res) => res.send('Hello from testimonials'));
router.post('/create', createTestimonials);
router.get('/all', getAllTestimonials);
router.get('/:id', getSingleTestimonial);
router.put('/:id', updateTestimonial);
router.delete('/:id', deleteTestimonial);

module.exports = router;