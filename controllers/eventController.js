const Event = require('../models/eventModel');


//Description: Create a new event
//Method: POST /api/v1/events/create
//ADMIN ONLY
const createEvent = async (req, res) => {
    if (
        !req.body.title ||
        !req.body.description ||
        !req.body.date ||
        !req.body.location
    ) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const event = await Event.create({
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            location: req.body.location,
            image: req.body.image,
        });
        res.status(201).json({ message: 'Event created successfully', event });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

//Description: Get all events
//Method: GET /api/v1/events/all
const getAllEvents = async (req, res) => {
    try {
        const event = await Event.find().sort({$natural:-1});
        res.status(200).json({ event });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

//Description: Get a single event
//Method: GET /api/v1/events/:id
const getSingleEvent = async (req, res) => {
    try{
        const event = await Event.find({_id: req.params.id});
        res.status(200).json({event});
    }
    catch (error) {
        res.status(500).json({message: `Unable to find record ${req.params.id}`});
    }
};

//Description: Delete an existing record
//Method: DELETE /api/v1/events/id
//ADMIN ONLY 
const deleteEvent = async (req, res) => {
    try{
        const event = await Event.find({_id: req.params.id});
        if (!event) {
            res.status(400).json({message: "No such event"});
            return;
        }
        await Event.findByIdAndDelete(req.params.id);
        res.status(200).json({message: `Event ${req.params.id} deleted successfully`});
    }
    catch (error) {
        res.status(500).json({message: `Unable to delete Event ${req.params.id}`});
    }
};

//Description: Update an existing event
//Method: PUT /api/v1/events/id
//ADMIN ONLY

const updateEvent = async (req, res) => {
    try {
        const event = await Event.find({_id: req.params.id});
        if (!event) {
            res.status(404).json({message: "No such event"});
            return;
        }
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body,{new: true});
        res.status(200).json({updatedEvent});
    } catch (error) {
        res.status(500).send("Cannot update event")
    }
};


module.exports = {
    createEvent, 
    getAllEvents,
    getSingleEvent,
    deleteEvent,
    updateEvent
}