const Header = (props) => {
  return (<> <h1>{props.courseName}</h1> </>)
}

const Part = (props) => {
  return (<> <p>{props.name} {props.exercises}</p> </>)
}

const Content = (props) => {
  return (
    <> 
      <Part name={props.courseParts[0].name} exercises={props.courseParts[0].exercises} />
      <Part name={props.courseParts[1].name} exercises={props.courseParts[1].exercises} />
      <Part name={props.courseParts[2].name} exercises={props.courseParts[2].exercises} />
    </>
  )
}

const Total = (props) => {
  const total = props.courseParts[0].exercises + props.courseParts[1].exercises + props.courseParts[2].exercises
  return (<> <p>Number of exercises {total}</p> </>)
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header courseName={course.name} />
      <Content courseParts={course.parts}/>
      <Total courseParts={course.parts}/>
    </div>
  )
}

export default App