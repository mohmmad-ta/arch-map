const Product = require('../models/productModel');
const factory = require('./handlerFactory');
const multer = require("multer");
const AppError = require("../utils/appError");
const catchAsync = require('./../utils/catchAsync');
const sharp = require("sharp");
const Video = require("./../models/3dVideoModel");

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/videos/');
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    }
});

// Allow only video MIME types
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('video/')) {
        cb(null, true);
    } else {
        cb(new AppError('Only video files are allowed.', 400), false);
    }
};

// Create multer upload instance
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});

// Use `.single()` for one file only
exports.uploadVideo = upload.single('video');
exports.processSingleVideo = catchAsync(async (req, res, next) => {
    if (!req.file) {
        return next(new AppError('Please upload a video file.', 400));
    }

    const videoUrl = `${req.protocol}://${req.get('host')}/public/videos/${req.file.filename}`;

    // If you're attaching to a body object or DB:
    req.body.video = videoUrl;

    next()
});


exports.getAllVideo = factory.getAll(Video);
exports.getOneVideo = factory.getOne(Video);
exports.createVideo = factory.createOne(Video);
exports.updateVideo = factory.updateOne(Video);
exports.deleteVideo = factory.deleteOne(Video);



