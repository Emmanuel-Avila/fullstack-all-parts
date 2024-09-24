import { useState } from 'react'

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

  const allClicks = good + neutral + bad;

  const average = () => {
    if(allClicks === 0){
      return 0;
    }
    return (good-bad)/allClicks;
  }

  const positivePercentage = () => {
    if(allClicks === 0){
      return 0;
    }
    return (good/allClicks)*100 + "%"
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button type="button" onClick={handleGood}>good</button>
      <button type="button" onClick={handleNeutral}>neutral</button>
      <button type="button" onClick={handleBad}>bad</button>
      <br />

      <h1>statistics</h1>
      {"good " + good}
      <br />
      {"neutral " + neutral}
      <br />
      {"bad " + bad}
      <br />
      {"all " + allClicks}
      <br />
      {"average " + average()}
      <br />
      {"positive " + positivePercentage()}
    </div>
  )
}

export default App