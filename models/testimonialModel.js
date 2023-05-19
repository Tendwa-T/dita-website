const mongoose = require('mongoose');
const testimonialSchema =mongoose.Schema(
    {
        title:{type: String, required: true},
        body:{type: String, required: true},
        image:{type: String, required: false}
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Testimonial', testimonialSchema);