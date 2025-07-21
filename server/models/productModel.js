const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
        name: {
            type: String,
            required: [true, 'A product must have a name'],
            trim: true,
        },
        description: {
            type: String,
            require: true,
            default: '',
        },
        imageCover: {
            type: String,
            require: [true, 'A product must have a cover image']
        },
        images: [String],
        pins: [
            {
                x: {
                    type: String,
                    required: true
                },
                y: {
                    type: String,
                    required: true
                }
            }
        ],
        createAt:{
            type: Date,
            default: Date.now(),
            select: false
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);


module.exports = mongoose.model('Product', productSchema);