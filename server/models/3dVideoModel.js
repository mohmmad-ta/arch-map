const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
        name: {
            type: String,
            required: [true, 'A product must have a name'],
            trim: true,
        },
        video: {
            type: String,
            require: [true, 'A product must have a cover image']
        },
        category: {
            type: String,
            enum: [ 'about', '3d'],
            default: '3d'
        },
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


module.exports = mongoose.model('Video', videoSchema);