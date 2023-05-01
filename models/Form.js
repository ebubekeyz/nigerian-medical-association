const mongoose = require('mongoose')

const FormSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'Please provide firstname'],
     },
    lastname: {
        type: String,
        required: [true, 'Please provide lastname'],
     },
     email: {
      type: String,
      required: [true, 'Please provide a valid email'],
      match: [
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          'Please provide a valid email',
        ],
  },
    designation: {
        type: String,
        required: [true, 'Please provide designation'],
     },
     title: {
        type: String,
        required: [true, 'Please provide title'],
     },
     phone: {
        type: String,
        required: [true, 'Please provide phone number'],
     },
     state: {
        type: String,
        required: [true, 'Please provide state'],
     },
     country: {
        type: String,
        required: [true, 'Please provide country'],
     },
     specialty: {
        type: String,
        required: [true, 'Please provide specialty'],
     },
     participant: {
        type: String,
        required: [true, 'Please provide participant'],
     },
     amount: {
        type: Number,
        required: [true, 'Please provide amount'],
     },
     image: {
        type: String,
        required: [true, 'Please provide image'],
     }
})

module.exports = mongoose.model('Form', FormSchema)