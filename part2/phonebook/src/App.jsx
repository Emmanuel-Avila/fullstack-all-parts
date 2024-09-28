import { useState } from 'react'
import { Filter } from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const [filter, setFilter] = useState('');

  const handleNameChange = (e) => setNewName(e.target.value)
  const handlePhoneChange = (e) => setNewPhone(e.target.value)
  const handleFilterChange = (e) => setFilter(e.target.value)

  const filtered = persons.filter((p) => p.name.toLowerCase().includes(filter));

  const addNewObject = (e) =>{
    e.preventDefault()
    if(persons.find((p) => p.name === newName) === undefined){
      setPersons(persons.concat({ 'name': newName, 'phone': newPhone, 'id': persons.length + 1 }))
      setNewName('')
      setNewPhone('')
      return
    }
    alert(`${newName} is already added to phonebook`)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm addNewObject={addNewObject} newName={newName} newPhone={newPhone} handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange}/>
      <h2>Numbers</h2>
      <div>
        debug: {newName}
      </div>
      <Persons filteredPersons={filtered}/>
    </div>
  )
}

export default App