const express = require('express');
const {
    createEvent, 
    getAllEvents,
    getSingleEvent,
    deleteEvent,
    updateEvent
} = require('../controllers/eventController');
const router = express.Router();

router.get('/', (req, res) => res.send('Hello from events'));
router.post('/create', createEvent);
router.get('/all', getAllEvents);
router.get('/:id', getSingleEvent);
router.delete('/:id', deleteEvent);
router.put('/:id', updateEvent);


module.exports = router;