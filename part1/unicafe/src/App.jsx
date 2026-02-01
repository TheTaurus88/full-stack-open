import { useState } from 'react'

const Text = ({text}) => <> {text} </>
const Button = ({text, onClick}) => <> <button onClick={onClick}>{text}</button></>
const StatisticLine = ({text, value, post}) => {
  return (
  <tr><td>{text} {value} {post}</td></tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const totalFeedback = good + neutral + bad
  if (totalFeedback === 0) return <div>No feedback given</div>
  return (
    <div> 
      <table>
        <tbody>
          <StatisticLine text={'good'} value={good}/>
          <StatisticLine text={'neutral'} value={neutral}/>
          <StatisticLine text={'bad'} value={bad}/>
          <StatisticLine text={'all'} value={totalFeedback}/>
          <StatisticLine text={'average'} value={(good - bad)/totalFeedback}/>
          <StatisticLine text={'positive'} value={good*100/totalFeedback} post={'%'}/>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Text text={'give feedback'}/>
      <div>
        <Button text='good' onClick={() => setGood(good + 1)}/>
        <Button text='neutral' onClick={() => setNeutral(neutral + 1)}/>
        <Button text='bad' onClick={() => setBad(bad + 1)}/>
      </div>
      <Text text={'statistics'}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App