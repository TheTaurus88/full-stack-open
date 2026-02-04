import { useState } from 'react'

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

const Persons = ({persons, filter}) => {
  return (
    <>
      {persons
      .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
      .map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' },
    { name: 'Bella Lestrange', number: '040-8910' },
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleSubmitNew = (event) => {
    event.preventDefault()
    const exists = persons.find(p => p.name === newName)
    if (exists) {
      alert(`${newName} is already added to phonebook`)
    } else {
      let newPerson = { name: newName, number: newNumber }
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }
  const handleChangeName = (event) => { setNewName(event.target.value) }
  const handleChangeNumber = (event) => { setNewNumber(event.target.value) }
  const handleChangeFilter = (event) => { setFilter(event.target.value) }

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
      <Persons persons={persons} filter={filter}/>
    </div>
  )
}

export default App