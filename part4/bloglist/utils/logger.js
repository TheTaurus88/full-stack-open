const info = (...messages) => {
  console.log(messages)
}

const error = (...messages) => {
  console.error(messages)
}

const exported = { info, error }
module.exports = exported