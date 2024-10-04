import { useState, useEffect } from 'react'
import { Filter } from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'
import './main.css'

const SuccessMessage = ({message}) => {
  if(message === null){
    return null;
  }

  return ( 
    <div className='success' >
      {message}
    </div> 
  )
}

const ErrorMessage = ({message}) => {
  if(message === null){
    return null;
  }

  return ( 
    <div className='error' >
      {message}
    </div> 
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect( () => {
    personsService
      .getAll()
      .then(data => {
        setPersons(data)
      })
  }
  ,[])

  const [filter, setFilter] = useState('');

  const handleNameChange = (e) => setNewName(e.target.value)
  const handlePhoneChange = (e) => setNewPhone(e.target.value)
  const handleFilterChange = (e) => setFilter(e.target.value)

  const filtered = persons.filter((p) => p.name.toLowerCase().includes(filter));

  const addNewObject = (e) => {
    e.preventDefault()
    const duplicatePerson = persons.find((p) => p.name === newName)
    if(duplicatePerson === undefined){
      personsService
        .create({name: newName, number: newPhone})
        .then(data => {
          setPersons( persons.concat(data))
        })
        .catch(err => alert(err));
      setSuccessMessage(`Added ${newName}`)
      setTimeout(()=>{
        setSuccessMessage(null);
      }, 3000)
      setNewName('')
      setNewPhone('')
      return
    }

    if(confirm(`${duplicatePerson.name} is already added to the phonebook, replace the old number with a new one?`)){
      personsService
        .update(duplicatePerson.id, { number: newPhone })
        .then( data => {
          setPersons(persons.map( p => p.id === duplicatePerson.id ? data : p ))
        })
        .catch(err => {
          console.log(err)
          setPersons(persons.filter(p => p.name !== duplicatePerson.name));
          setErrorMessage(`Information about ${duplicatePerson.name} has already been removed from server`);
          setTimeout(() => {
            setErrorMessage(null);
          },3000)
        })
    }
  }

  const handleDeletePerson = (name, id) => {
    if(confirm(`Delete ${name} ?`)){
      personsService
        .deletePerson(id)
        .then( data => {
          setPersons(persons.filter(p => p.id !== data.id));
        })
        .catch(err =>{
          console.log(err)
          setPersons(persons.filter(p => p.id !== id));
          alert(`Information about ${name} has already been removed from server`)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessMessage message={successMessage} />
      <ErrorMessage message={errorMessage}/>
      <Filter filter={filter} handleChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm addNewObject={addNewObject} newName={newName} newPhone={newPhone} handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange}/>
      <h2>Numbers</h2>
      <div>
        debug: {newName}
      </div>
      <Persons handleRemove={handleDeletePerson} filteredPersons={filtered}/>
    </div>
  )
}

export default App