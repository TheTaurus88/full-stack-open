const mongoose = require('mongoose')

// solve connection error according to https://www.mongodb.com/community/forums/t/error-querysrv-econnrefused-mongodb/259042/4
const dns = require('node:dns/promises')
dns.setServers(['1.1.1.1'])

const url = process.env.MONGODB_URI
mongoose.set('strictQuery',false)
mongoose.connect(url, { family: 4 })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3
  },
  number: {
    type: String,
    required: true,
    minLength: 8,
    validate: {
      validator: function(v) {
        return /\d{2}\d?-\d*/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    },
  },
})

// comes in play using method response.json(data) in order to manipulate returned json
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
module.exports = mongoose.model('Person', personSchema)
