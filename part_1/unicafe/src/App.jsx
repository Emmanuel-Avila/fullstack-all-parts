import { useState } from 'react'

const StatisticsLine = ({text, value}) => {
  return (
    <tr>
      <td>
        {text}
      </td>
      <td>
        {value}
      </td>
    </tr>
  )
}

const Statistics = ({good, bad, neutral}) => {
  const allClicks = good + neutral + bad;

  const average = () => {
    return (good-bad)/allClicks;
  }

  const positivePercentage = () => {
    return (good/allClicks)*100 + "%"
  }

  return(
    <>
      <h1>statistics</h1>
      {
        allClicks === 0 ? 
        "No feedback given"  
          :
        <table>
          <tbody>
            <StatisticsLine text={"good"} value={good}/>
            <StatisticsLine text={"neutral"} value={neutral}/>
            <StatisticsLine text={"bad"} value={bad}/>
            <StatisticsLine text={"all"} value={allClicks}/>
            <StatisticsLine text={"average"} value={average()}/>
            <StatisticsLine text={"positive"} value={positivePercentage()}/>
          </tbody>
        </table> 
      }
    </>
  )
}

const Button = ({text, handleClick}) => {

  return(
    <button type="button" onClick={handleClick}>{text}</button>
  )
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1);
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }


  return (
    <div>
      <h1>give feedback</h1>
      <Button text={"good"} handleClick={handleGood} />
      <Button text={"neutral"} handleClick={handleNeutral} />
      <Button text={"bad"} handleClick={handleBad} />
      <br />

      <Statistics good={good} neutral={neutral} bad={bad} />

    </div>
  )
}

export default App