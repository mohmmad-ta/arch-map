const Product = require('../models/productModel');
const factory = require('./handlerFactory');
const multer = require("multer");
const AppError = require("../utils/appError");
const catchAsync = require('./../utils/catchAsync');
const sharp = require("sharp");
const User = require("./../models/userModel");

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new AppError('Not an image! Please upload only images.', 400), false);
    }
};
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});
exports.uploadProductPhoto = upload.fields([
    {name: 'imageCover', maxCount: 1},
    {name: 'images', maxCount: 20},
])
exports.resizeTourImages = catchAsync(async (req, res, next) => {
    if (!req.files.imageCover || !req.files.images) return next();
    // 1) Cover image
    req.body.imageCover = `${req.protocol}://${req.get('host')}/public/images/products/${Date.now()}-${req.files.imageCover.fieldname}.jpeg`;
    const nameImageCover = `${Date.now()}-${req.params.id}.jpeg`;
    console.log(req.body.imageCover)
    await sharp(req.files.imageCover[0].buffer)
        .toFormat('jpeg')
        .jpeg({ quality: 100 })
        .toFile(`public/images/products/${nameImageCover}`);

    // 2) Images
    req.body.images = [];
    await Promise.all(
        req.files.images.map(async (file, i) => {
            const nameImages = `${Date.now()}-${req.files.images[i].fieldname}.jpeg`;
            const filename = `${req.protocol}://${req.get('host')}/public/images/products/${Date.now()}-${req.files.images[i].fieldname}.jpeg`;

            await sharp(file.buffer)
                .toFormat('jpeg')
                .jpeg({ quality: 100 })
                .toFile(`public/images/products/${nameImages}`);

            req.body.images.push(filename);
        })
    );


    next();
});


exports.getAllProduct = factory.getAll(Product);
exports.getOneProduct = factory.getOne(Product);
exports.createProduct = factory.createOne(Product);
exports.updateProduct = factory.updateOne(Product);
exports.deleteProduct = factory.deleteOne(Product);



