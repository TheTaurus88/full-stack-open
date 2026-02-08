import axios from 'axios'

const getAllPersons = () => {
    return axios
          .get('http://localhost:3001/persons')
          .then(response => {
            console.log('getAllPersons', response)
            return response
          })
}

const addPerson = (newPerson) => {
    return axios
            .post('http://localhost:3001/persons', newPerson)
            .then(response => {
            console.log('addPerson', response)
            return response
        })
}

const deletePerson = (id) => {
    return axios
            .delete(`http://localhost:3001/persons/${id}`)
            .then(response => {
            console.log('deletePerson', response)
            return response
        })
}

const changePerson = (person) => {
    return axios
            .put(`http://localhost:3001/persons/${person.id}`, person)
            .then(response => {
            console.log('changePerson', response)
            return response
        })
}

export default { getAllPersons, addPerson, deletePerson, changePerson }