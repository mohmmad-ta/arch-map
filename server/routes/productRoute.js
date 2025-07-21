const {Router} = require('express');
const router = Router();
const {createProduct, deleteProduct, getAllProduct, getOneProduct, updateProduct, uploadProductPhoto, resizeTourImages} = require('../controllers/productController')
const {protect, restrictTo} = require('../controllers/authController')


router.route('/')
    .get(getAllProduct)
    .post(protect, restrictTo('admin'), uploadProductPhoto, resizeTourImages, createProduct)

router.route('/:id')
    .get(getOneProduct)
    .patch(protect, restrictTo('admin'), uploadProductPhoto, resizeTourImages, updateProduct)
    .delete(protect, restrictTo('admin'), deleteProduct)

module.exports = router;
