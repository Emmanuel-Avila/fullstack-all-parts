import { useState } from 'react'

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
      <div>
        filter shown with: <input type="text" value={filter} onChange={() => setFilter(event.target.value)}/>
      </div>
      <h2>add a new</h2>
      <form onSubmit={addNewObject}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          phone: <input value={newPhone} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        debug: {newName}
      </div>
      {
        filtered.map((p)=> <div key={p.id}>{p.name} {p.number}</div>)
      }
    </div>
  )
}

export default App