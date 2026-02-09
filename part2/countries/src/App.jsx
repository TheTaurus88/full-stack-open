import { useEffect, useState } from 'react'
import axios from 'axios'
import Form from './components/Form'
import Countries from './components/Countries'

const App = () => {
  const [filter, setFilter] = useState('')
  const [names, setNames] = useState([])
  const [allCountries, setAllCountries] = useState([])

  const allCountriesHook = () => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(resp => {
        setAllCountries(resp.data)
      })
  }
  useEffect(allCountriesHook, [])

  const handleChange = (event) => { 
    const newFilter = event.target.value
    setFilter(newFilter) 
    let found = allCountries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))
    if (found) {
      setNames(found.map(country => country.name.common))
    }
  }
  
  const handleShow = (event) => { 
    setNames([].concat(event.target.value))
  }

  return (
    <div>
      <Form filter={filter} handleChange={handleChange}/>
      <Countries names={names} allCountries={allCountries} handleShow={handleShow}/>
    </div>
  )
}

export default App
