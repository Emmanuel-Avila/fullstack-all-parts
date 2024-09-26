const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) => {
  const sum = parts.reduce((sum, part) => { 
    return part.exercises + sum; 
  }, 0)
  return (<p>Number of exercises {sum}</p>)
}

const Part = ({ part }) => {
  return (  
    <p>
      {part.name} {part.exercises}
    </p>
  )
}


const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => <Part key={part.id} part={part}/>)} 
    </>
  )
}

const Course = ({course}) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </>
  )
}

export default Course