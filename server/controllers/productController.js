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
exports.uploadProductPhoto = upload.any()
exports.resizeTourImages = catchAsync(async (req, res, next) => {
    req.body.pins = JSON.parse(req.body.pins);

    req.body.pins.map((file, index)=>{
        req.body.pins[index].images = [];
    })
    await Promise.all(

        req.files.map(async (file, index) => {
            const nameImages = `${Date.now()+index}-${file.fieldname}.jpeg`;
            const filename = `${req.protocol}://${req.get('host')}/public/images/products/${Date.now()+index}-${file.fieldname}.jpeg`;
            if (file.fieldname === "imageCover"){
                req.body.imageCover = filename;
            }else {
                req.body.pins[file.fieldname*1].images.push(filename)
            }
            await sharp(file.buffer)
                .toFormat('jpeg')
                .jpeg({ quality: 100 })
                .toFile(`public/images/products/${nameImages}`);
        })
    );


    next();
});


exports.getAllProduct = factory.getAll(Product);
exports.getOneProduct = factory.getOne(Product);
exports.createProduct = factory.createOne(Product);
exports.updateProduct = factory.updateOne(Product);
exports.deleteProduct = factory.deleteOne(Product);



