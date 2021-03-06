import React, {useState, useEffect} from 'react';
import uniqid from "uniqid";
import './styles/App.scss';
import './styles/cssReset.scss';
import Cards from './components/Cards.js';
import Header from './components/Header.js';
import Stats from './components/Stats.js';

function App() {
  const [cars, setCars] = useState([
    {url: 'images/969-Maserati-Ghibli-47.jpg', name: 'Maserati', clicked: false, id: uniqid()},
    {url: 'images/1961-Jaguar-E-Type.jpg', name: 'Jaguar', clicked: false, id: uniqid()},
    {url: 'images/1962-Ferrari-250.jpg', name: 'Ferrari 250', clicked: false, id: uniqid()},
    {url: 'images/1963-Aston-Martin-DB5.jpg', name: 'Aston Martin', clicked: false, id: uniqid()},
    {url: 'images/1963-Corvette-Sting-Ray.jpg', name: 'Corvette', clicked: false, id: uniqid()},
    {url: 'images/1966-Alfa-Romeo-Spider-Duetto.jpg', name: 'Alfa-Romeo', clicked: false, id: uniqid()},
    {url: 'images/1966-Lamborghini-Miura.jpg', name: 'Lamborghini', clicked: false, id: uniqid()},
    {url: 'images/1966-Shelby-Cobra-427.jpg', name: 'Shelby', clicked: false, id: uniqid()},
    {url: 'images/1969-Boss-429-Mustang.jpg', name: 'Boss', clicked: false, id: uniqid()},
    {url: 'images/1969-Chevrolet-Camaro.jpg', name: 'Chevrolet', clicked: false, id: uniqid()},
    {url: 'images/1969-Dodge-Charger-2.jpg', name: 'Dodge', clicked: false, id: uniqid()},
    {url: 'images/1969-Ferrari-Dino-246-GT.jpg', name: 'Ferrari Dino', clicked: false, id: uniqid()},
    {url: 'images/1970-Datsun-240Z.jpg', name: 'Datsun', clicked: false, id: uniqid()},
    {url: 'images/Mercedes-300SL-Gullwing.jpg', name: 'Mercedes', clicked: false, id: uniqid()},
    {url: 'images/Toyota-2000GT.jpg', name: 'Toyota', clicked: false, id: uniqid()}
  ])
  const [timer, setTimer] = useState(5)
  const [originalTimer, setOriginalTimer] = useState(timer)
  const [gameStarted, setGameStarted] = useState(false)
  const [updater, setUpdater] = useState(1)
  const [win, setWin] = useState(0)
  const [lose, setLose] = useState(0)
  const [score, setScore] = useState(1)
  const [remaining, setRemaining] = useState(15)
  const [originalRemaining, setOriginalRemaining] = useState(15)
  const [highScore, setHighScore] = useState(0)

  let helper
  let timerInterval

  function handleStats(img) {
    //prevents score from adding 1 when it clicks an image that makes you lose the game
    if (img.clicked === true) {
      setScore(prevScore => prevScore + 1)
      if (score>highScore) {
        setHighScore(score)
      }
      setRemaining(prevRemaining => prevRemaining - 1)
    }
  }
  function resetStats() {
    setScore(1)
    setRemaining(originalRemaining)
  }
  function handleLose() {
    setLose(prevLose => prevLose + 1)
  }


  // resets the game and "clicked" attributes on images
  function resetGame() {
    for (var i=0; i < cars.length; i++) {
      cars[i].clicked = false
    };
    setGameStarted(false);
    resetTimer()
    resetStats()
  }
  // resets all timers
  function resetTimer() {
    var highestTimeout = setInterval(";")
    for (var i=0; i<highestTimeout; i++) {
      clearInterval(i);
    }
    clearInterval(timerInterval)
    setTimer(originalTimer);
  }

  const handleTimer = (img) => {
    // when timer is up you lose
    resetTimer();
    helper = originalTimer
    if (remaining === 1) {
      alert('Congratulations! You have won!')
      setWin(prevWin => prevWin + 1)
      resetGame()
    } else {

      timerInterval = setInterval(() => {
        helper -= 1
        setTimer(helper)
        console.log(helper)
        if (helper === 0) {
          alert('Time is up! You have lost')
          handleLose()
          resetGame()
          clearInterval(timerInterval)
        }
      }, 1000)
      
      // clicking twice on the same image makes you lose
      if (img.clicked === false) {
        img.clicked = true
      } else {
        alert("You already clicked this image, you have lost")
        handleLose()
        resetGame()
        clearInterval(timerInterval)
      }
    }
  }



  return (
    <div className="App">
      <Header 
        timer={timer}
        setTimer={setTimer}
      />
      <Cards 
        cars={cars} 
        setCars={setCars}
        handleTimer={handleTimer}
        gameStarted={gameStarted}
        setGameStarted={setGameStarted}
        updater={updater}
        setUpdater={setUpdater}
        handleStats={handleStats}
      />
      <Stats 
        win={win}
        lose={lose}
        score={score}
        remaining={remaining}
        highScore={highScore}
      />
    </div>
  );
}

export default App;
