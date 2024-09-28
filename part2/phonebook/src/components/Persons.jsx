import React from 'react'

const Persons = ({filteredPersons}) => {
  return (
    <>
      {filteredPersons.map((p)=> <div key={p.id}>{p.name} {p.number}</div>)}
    </>
  )
}

export default Persons