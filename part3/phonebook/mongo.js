const mongoose = require('mongoose')

// solve connection error according to https://www.mongodb.com/community/forums/t/error-querysrv-econnrefused-mongodb/259042/4
const dns = require('node:dns/promises')
dns.setServers(['1.1.1.1'])

const pwd = process.argv[2]
if (!pwd) {
  console.log('Missing 1st argument (pwd)')
  process.exit(1)
}

const url = `mongodb+srv://fullstackopen:${pwd}@fullstackopen.nd6tqxa.mongodb.net/?appName=FullStackOpen`
mongoose.set('strictQuery',false)
mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})
const Person = mongoose.model('Person', personSchema)

if (process.argv.length < 5) {
  Person.find({})
    .then(result => {console.log(result)
      console.log('phonebook:\n', result.map(person => `${person.name} ${person.number}`).join('\n'))
      mongoose.connection.close()
    })
} else {
  const newPerson = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })
  newPerson.save()
    .then(result => {
      console.log('person saved!', result)
      mongoose.connection.close()
    })
}
