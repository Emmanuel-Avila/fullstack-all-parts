import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryDetails = ({country, show = true}) => {
  if(!show){
    return null
  }
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
  const [show, setShow] = useState(false);

  return(
    <>
      {countries.length > 10 ? "Too many matches, specify another filter" :
        countries.map( c => {
          return (
            <>
              <div key={c.name.official}>{c.name.official}
                <button type="button" onClick={() => setShow(!show)}>show</button>
              </div>
              <CountryDetails country={c} show={show} />
            </>
          )
        })
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

  // useEffect(() => {
  //   console.log('effect run, value is now', value)

  //   if (value) {
  //     console.log('fetching countries...')
  //     axios
  //       .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${value}`)
  //       .then(response => {
  //         console.log(response)
  //         setCountries(response.data)
  //       })
  //   }
  // }, [value])

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