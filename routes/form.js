const express = require('express')
const router = express.Router()
 
const { createForm, deleteForm, getAllForms, updateForm, getSingleForm} = require('../controllers/form')
const uploadImage = require('../controllers/uploadImage')

router.route('/').get(getAllForms).post(createForm)
router.route('/:id').get(getSingleForm).patch(updateForm).delete(deleteForm)
router.route('/uploads').post(uploadImage)

module.exports = router