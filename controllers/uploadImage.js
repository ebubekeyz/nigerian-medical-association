const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')
const {BadRequestError} = require('../errors')
const cloudinary = require('cloudinary').v2
const path = require('path')
const fs = require('fs')


const uploadImageLocal = async(req, res) => {
    const formImage = req.files.image
    if(!req.files){
        throw new CustomError.BadRequestError('No File uploaded')
    }
    if(!formImage.mimetype.startsWith('image')){
        throw new CustomError.BadRequestError('Please upload image')
    }

    const maxSize = 1024 * 1024
    if(formImage.size > maxSize){
        throw new CustomError.BadRequestError('Please upload image smaller than ${maxSize}')
    }

    const imagePath = path.join(__dirname, '../public/uploads/' + `${formImage.name}`)

    await formImage.mv(imagePath)

    return res.status(StatusCodes.OK).json({image: {src: `/uploads/${formImage.name}`}})
}

const uploadImage = async(req, res) => {
   
    const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath, {
            use_filename: true, folder: 'nma-file-upload',
        }
    )
    fs.unlinkSync(req.files.image.tempFilePath)
    return res.status(StatusCodes.OK).json({image: {src: result.secure_url}})
}

module.exports = uploadImage