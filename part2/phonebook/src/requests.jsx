import axios from 'axios'

// const completeUrl = 'http://localhost:3001/api/persons'
const completeUrl = '/api/persons'

const getAllPersons = () => {
    return axios
          .get(completeUrl)
          .then(response => {
            console.log('getAllPersons', response)
            return response
          })
}

const addPerson = (newPerson) => {
    return axios
            .post(completeUrl, newPerson)
            .then(response => {
            console.log('addPerson', response)
            return response
        })
}

const deletePerson = (id) => {
    return axios
            .delete(`${completeUrl}/${id}`)
            .then(response => {
            console.log('deletePerson', response)
            return response
        })
}

const changePerson = (person) => {
    return axios
            .put(`${completeUrl}/${person.id}`, person)
            .then(response => {
            console.log('changePerson', response)
            return response
        })
}

export default { getAllPersons, addPerson, deletePerson, changePerson }