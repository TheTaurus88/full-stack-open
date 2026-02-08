import { useEffect, useState } from 'react'
import jsonServer from './json-server'

const Filter = ({filter, handleChangeFilter}) => {
  return (
      <div>
        filter shown with 
        <input value={filter} onChange={handleChangeFilter}/>
      </div>
  )
}

const PersonForm = (props) => {
  return (
      <form onSubmit={props.handleSubmitNew}>
        <div>
          name: <input value={props.newName} onChange={props.handleChangeName}/>
        </div>
        <div>
          number: <input value={props.newNumber} onChange={props.handleChangeNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Person = ({person, handleDelete}) => {
  return (
    <div>
      {<>{person.name} {person.number} </>}
      <button onClick={handleDelete} value={person.id}>delete</button>
    </div>
  )
}

const Persons = ({persons, filter, handleDelete}) => {
  return (
    <>
      {persons
      .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
      .map(person => <Person 
        key={person.name} 
        person={person}
        handleDelete={handleDelete}/>)}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const hook = () => {
    jsonServer.getAllPersons().then(response => setPersons(response.data))
  }
  useEffect(hook, [])
  console.log('render', persons)

  const handleSubmitNew = (event) => {
    event.preventDefault()
    const exists = persons.find(p => p.name === newName)
    if (exists) {
      // alert(`${newName} is already added to phonebook`)
      if (window.confirm('Wanna change number?')) {
        let newPerson = { ...exists, number: newNumber}
        jsonServer.changePerson(newPerson)
        .then(response => {
          setPersons(persons.map(person => person.id === exists.id ? response.data : person))
          setNewName('')
          setNewNumber('')
        })
      }
    } else {
      let newPerson = { name: newName, number: newNumber }
      jsonServer.addPerson(newPerson)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
    }
  }
  const handleChangeName = (event) => { setNewName(event.target.value) }
  const handleChangeNumber = (event) => { setNewNumber(event.target.value) }
  const handleChangeFilter = (event) => { setFilter(event.target.value) }
  const handleDelete = (event) => { 
    if (window.confirm('Wanna delete?')) {
      jsonServer.deletePerson(event.target.value)
        .then(response => {
          setPersons(persons.filter(person => person.id !== response.data.id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleChangeFilter={handleChangeFilter}/>
      <h2>Add new person</h2>
      <PersonForm 
        handleSubmitNew={handleSubmitNew} 
        newName={newName}
        handleChangeName={handleChangeName}
        newNumber={newNumber}
        handleChangeNumber={handleChangeNumber}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} handleDelete={handleDelete}/>
    </div>
  )
}

export default App