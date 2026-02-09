
const Countries = ({names, allCountries, handleShow}) => {
    console.log('names',names)
  if (names.length > 10) {
    return ( <div> Too many matches </div> )
  } else if (names.length === 1) {
    const name = names[0]
    const country = allCountries.find(country => country.name.common === name)
    return (
      <div>
        <h1>{name}</h1>
        <p>Capital {country.capital}</p>
        <p>Area {country.area}</p>
        <h2>Languages</h2>
        {Object.values(country.languages).map(lang => <p key={lang}>{lang}</p>)}
        <img src={country.flags.png}></img>
      </div>
    )
  } else {
    return (
      <div>
        {names.map(name => 
          <div key={name}>
            {name}
            <button onClick={handleShow} value={name}>Show</button>
          </div>
        )}
      </div>
    )
  }
}

export default Countries