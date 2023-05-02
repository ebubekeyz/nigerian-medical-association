const { UnauthenticatedError, BadRequestError, NotFoundError } = require('../errors')
const Form = require('../models/Form')
const {StatusCodes} = require('http-status-codes')
const nodemailer = require('nodemailer')

const getAllForms = async (req, res) => {
    const form = await Form.find({})
    res.status(StatusCodes.OK).json({ form, count: form.length })
  }
  const getSingleForm = async (req, res) => {
    const {id: formId } = req.params
  
    const form = await Form.findOne({
      _id: formId,
    })
    if (!form) {
      throw new NotFoundError(`No form with id ${formId}`)
    }
    res.status(StatusCodes.OK).json({ form })
  }
  
  const createForm = async (req, res) => {
    const {
      firstname, lastname, email, designation, title, phone, state, country, specialty, participant, amount, image} = req.body
 
      


     let testAccount = await nodemailer.createTestAccount()

    const transporter = nodemailer.createTransport({
        host: process.env.GMAIL_HOST,
        port: process.env.GMAIL_PORT,
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS      
        },
    })

    let info = await transporter.sendMail({
      from: `"${firstname} ${lastname}" <${email}>`,
      to: 'chrisbenotene@gmail.com',
      subject: 'NEW REGISTRATION',
      html: `<div style="padding: 2rem 1rem; margin: 0 auto; background: rgba(204, 196, 196, 0.781); box-shadow:0 5px 15px rgba(0, 0, 0, 0.2); ">

      <div style="text-align: center;"><img src="https://res.cloudinary.com/dsrtdywmf/image/upload/v1682882379/nma-file-upload/tmp-1-1682882376297_kycp5x.png" style="width: 40px;"></div>

      <h3 style="text-align: center;"><strong>Nigerian Medical Association Annual Conference</strong></h3>

      <table style="width: 100%">
      <tr>
      <td style="padding: 1rem 1rem; text-transform: capitalize; color: rgba(14, 133, 59, 0.6);"><strong>Name:</strong></td>
      <td style="padding: 1rem 1rem; text-transform: capitalize;">${title} ${firstname} ${lastname}</td>
      </tr>
      <tr>
      <td style="padding: 1rem 1rem; text-transform: capitalize; color: rgba(14, 133, 59, 0.6);"><strong>Email:</strong></td>
      <td style="padding: 1rem 1rem;text-transform: capitalize;"> ${email}</td>
      </tr>
      <tr>
      <td style="padding: 1rem 1rem; text-transform: capitalize; color: rgba(14, 133, 59, 0.6);"><strong>Designation:</strong></td>
      <td style="padding: 1rem 1rem; text-transform: capitalize;"> ${designation}</td>
      </tr>
      <tr>
      <td style="padding: 1rem 1rem; text-transform: capitalize; color: rgba(14, 133, 59, 0.6);"><strong>Phone:</strong></td>
      <td style="padding: 1rem 1rem; text-transform: capitalize;"> ${phone}</td>
      </tr>
      <tr>
      <td style="padding: 1rem 1rem; text-transform: capitalize; color: rgba(14, 133, 59, 0.6);"><strong>State/Country:</strong></td>
      <td style="padding: 1rem 1rem; text-transform: capitalize;"> ${state}/${country}</td>
      </tr>
      <tr>
      <td style="padding: 1rem 1rem; text-transform: capitalize; color: rgba(14, 133, 59, 0.6);"><strong>Specialty:</strong></td>
      <td style="padding: 1rem 1rem; text-transform: capitalize;"> ${specialty}</td>
      </tr>
      <tr>
      <td style="padding: 1rem 1rem; text-transform: capitalize; color: rgba(14, 133, 59, 0.6);"><strong>Participant:</strong></td>
      <td style="padding: 1rem 1rem; text-transform: capitalize;"> ${participant}</td>
      </tr>
      <tr>
      <td style="padding: 1rem 1rem; color: rgba(14, 133, 59, 0.6);"><strong>Amount:</strong></td>
      <td style="padding: 1rem 1rem;"> N${amount}</td>
      </tr>
      <tr>
      <td style="text-transform: capitalize; padding: 1rem 1rem; color: rgba(14, 133, 59, 0.6);"><strong>Payment Receipt:</strong></td>
      <td style="padding: 1rem 1rem;"> <a href="${image}"><img src="${image}" style="width: 25px; height: 25px; object-fit: cover"></a></td>
      </tr>
     
      </table>

      </div>
      `
    })
  

     const form = await Form.create(req.body)
     res.status(StatusCodes.CREATED).json({ form})
  }

  
  const updateForm = async (req, res) => {
    const {firstname, lastname, email, designation, title, phone, state, country, specialty, participant, amount, image} = req.body

    const {id: formId } = req.params
  
    if(!firstname && !lastname && !email && !designation && !title && !phone && !state && !country && !specialty && !participant && !amount && !image){
      throw new BadRequestError('Please no field should be left empty')
    }
   
    const form = await Form.findByIdAndUpdate(
      { _id: formId },
      req.body,
      { new: true, runValidators: true }
    )
    if (!form) {
      throw new NotFoundError(`No form with id ${formId}`)
    }
    res.status(StatusCodes.OK).json({ form })
  }
  
  const deleteForm = async (req, res) => {
    const {id: formId } = req.params
  
    const form = await Form.findByIdAndRemove({
      _id: formId,
    })
    if (!form) {
      throw new NotFoundError(`No form with id ${formId}`)
    }
    res.status(StatusCodes.OK).send()
  }

  module.exports = {
    createForm,
    deleteForm,
    getAllForms,
    updateForm,
    getSingleForm,
  }
  