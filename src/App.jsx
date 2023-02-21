import { useState,useEffect, useRef } from "react";

function App(){
  const START_TIME = 15

  const [text, setText] = useState('')
  const [timeRemaing, setTimeRemaining] = useState(START_TIME)
  const [wordCount, setWordCount] = useState(0)
  const [isTimeRuning, setIsTimeRuning] = useState(false)
  const textBox = useRef(null)

  function handleChanges(e){
    const {value} = e.target
    setText(value)
  }

  function calculateWords(text){
    const wordsArray = text.trim().split(' ')
    const filteredWords = wordsArray.filter(word => word !== '')
    return filteredWords.length
  }

  function startGame(){
    setIsTimeRuning(true)
    setText('')
    setWordCount(0)
    textBox.current.disabled = false
    textBox.current.focus()
  }
  
  function endGame(){
    setWordCount(calculateWords(text))
    setIsTimeRuning(false)
    setTimeRemaining(START_TIME)
  }

  useEffect(() => {
    if(timeRemaing > 0 && isTimeRuning){
      setTimeout(() => {
        setTimeRemaining(time => time - 1)
      }, 1000);
    } else if(timeRemaing === 0){
      endGame()
    }
  },[timeRemaing, isTimeRuning])

  return (
    <div>
      <h1>How many words can you type?</h1>
      <textarea
      value={text} 
      onChange={handleChanges}
      disabled={!isTimeRuning}
      ref={textBox}
      />
      <h3>Time remaining:{timeRemaing}</h3>
      <button
      disabled={isTimeRuning}
      onClick={startGame}
      >Start</button>
      <h2>Word Count: {wordCount}</h2>
    </div>
  )
}

export default App