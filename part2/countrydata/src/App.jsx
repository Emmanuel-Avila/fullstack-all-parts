import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryDetails = ({country}) => {
  console.log(country)
  return(
    <>
      <h1>{country.name.official}</h1>
      <div>capital: {country.capital[0]}</div>
      <div>area: {country.area}</div>
      <div>languages: </div>
      <ul>
        {Object.values(country.languages).map( 
          l => <li key={l}> {l}</li>
        ) }
      </ul>
      <img src={country.flags.png} alt="country flag" />
    </>
  )
}

const CountriesList = ({countries}) => {
  return(
    <>
      {countries.length > 10 ? "Too many matches, specify another filter" :
        countries.map( c => <div key={c.name.official}>{c.name.official}</div>)
      }
    </>
  )
}

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then( response => {
      setCountries(response.data);
    })
  }, [])

  const handleChange = (event) => {
    setValue(event.target.value)

  } 
  
  const searchedCountries = countries.filter(c => c.name.official.toLowerCase().includes(value.toLowerCase()));
  return (
    <div>
      <div>
        country: <input value={value} onChange={handleChange} />
      </div>
      {searchedCountries.length === 1 ? 
        <CountryDetails country={searchedCountries[0]}/> :
        <CountriesList countries={searchedCountries}/>
      }
    </div>
  )
}

export default App