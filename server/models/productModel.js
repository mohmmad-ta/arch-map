const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
        name: {
            type: String,
            required: [true, 'A product must have a name'],
            trim: true,
        },
        imageCover: {
            type: String,
            require: [true, 'A product must have a cover image']
        },
        category: {
            type: String,
            enum: [ 'completed', 'planned', 'unfinished'],
            default: 'completed'
        },
        pins: [
            {
                x: {
                    type: String,
                    required: true
                },
                y: {
                    type: String,
                    required: true
                },
                images: [String],
                name: String,
            }
        ],
        createAt:{
            type: Date,
            default: Date.now(),
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);


module.exports = mongoose.model('Product', productSchema);