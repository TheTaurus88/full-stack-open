const Header = ({name}) => <h1>{name}</h1>
const Content = ({parts}) => {
  const sum = parts.reduce(((sum, part) => { return sum + part.exercises }), 0)
  return (
  <>
    {parts.map(part => 
      <p>{part.name} {part.exercises}</p>
    )}
    total of {sum} exercises
  </>
  )}

const Course = ({course}) => {
  return (
    <>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
    </>
  )
}

export default Course