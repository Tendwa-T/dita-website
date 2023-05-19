const Testimonial = require('../models/testimonialModel');

//Description: Create testimonial
//Method: POST /api/v1/testimonials/create
//Admin only
const createTestimonials = async (req, res)=>{
    if(
        !req.body.title ||
        !req.body.body
    ){
        res.status(400).json({
            message: 'All fields are required'
        })
    }

    try {
        const testimonial = await Testimonial.create({
            title: req.body.title,
            body: req.body.body,
            image: req.body.image
        });
        res.status(201).json(testimonial);
    } catch (error) {
        res.status(500).json({message:error});
    }
};

//Description: Get all testimonials
//Method: GET /api/v1/testimonials/all
const getAllTestimonials = async (req, res)=>{
    try {
        const testimonial= await Testimonial.find().sort({$natural:-1});
        res.status(200).json(testimonial);
    }
    catch (error) {
        res.status(500).json({message:error});
    }
};

//Description: Get a single testimonial
//Method: GET /api/v1/testimonials/:id
const getSingleTestimonial = async (req, res)=>{
    try {
        const testimonial = await Testimonial.find({_id: req.params.id});
        res.status(200).json(testimonial);
    } catch (error) {
        res.status(500).json({message:error});
    }
};

//Description: Update a testimonial
//Method: PUT /api/v1/testimonials/:id
const updateTestimonial = async (req, res)=>{
    try {
        const testimonial = await Testimonial.findById(req.params.id);
        if (!testimonial) {
            return res.status(400).send("No testimonial found");
        }
        const updatedtestimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json(updatedtestimonial);
    } catch (error) {
        res.status(500).json({message:error});
    }
};

//Description: Delete a testimonial
//Method: DELETE /api/v1/testimonials/:id
const deleteTestimonial = async (req, res)=>{
    try {
        const testimonial = await Testimonial.findById({_id: req.params.id});
        if (!testimonial) {
            res.status(400).send("No testimonial found");
        }
        await Testimonial.findByIdAndDelete(req.params.id);
        res.status(200).send({id: req.params.id, message: "Testimonial deleted successfully"});
    } catch (error) {
        res.status(500).send({id: req.params.id, message: "Testimonial couldn't be deleted"});
    }
}

module.exports = {
    createTestimonials,
    getAllTestimonials,
    getSingleTestimonial,
    updateTestimonial,
    deleteTestimonial
};