import React from 'react'

const Persons = ({filteredPersons, handleRemove}) => {
  return (
    <>
      {filteredPersons.map((p)=> <div key={p.id}>{p.name} {p.number} <button type="button" onClick={() => handleRemove(p.name, p.id)}>delete</button></div>)}
    </>
  )
}

export default Persons