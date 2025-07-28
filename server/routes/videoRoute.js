const {Router} = require('express');
const router = Router();
const {createVideo, deleteVideo, getAllVideo, getOneVideo, processSingleVideo, updateVideo, uploadVideo} = require('../controllers/videoController')
const {protect, restrictTo} = require('../controllers/authController')


router.route('/')
    .get(getAllVideo)
    .post(protect, restrictTo('admin'), uploadVideo, processSingleVideo, createVideo)

router.route('/:id')
    .get(getOneVideo)
    .patch(protect, restrictTo('admin'), uploadVideo, processSingleVideo, updateVideo)
    .delete(protect, restrictTo('admin'), deleteVideo)

module.exports = router;
