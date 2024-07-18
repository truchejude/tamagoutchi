import './App.css'
import Bare from './Bare.tsx'
import React, { useState, useEffect } from 'react'
import { formatDate } from './date.tsx'

function App() {
  const [hp, setHp] = useState(100)
  const [food, setFood] = useState(() => {
    const savedFood = localStorage.getItem('food');
    return savedFood !== null ? Number(savedFood) : 100;
  });
  const [joie, setJoie] = useState(100)
  const intervalTime = 500;

  useEffect(() => {
    const lastUpdateTime = localStorage.getItem('lastUpdateTime');
    const now = Date.now();

    if (lastUpdateTime) {
      const elapsedTime = now - Number(lastUpdateTime);
      const timesDecremented = Math.floor(elapsedTime / intervalTime);
      if (timesDecremented > 0) {
        const newFoodValue = Math.max(food - timesDecremented, 0);
        setFood(newFoodValue);
        localStorage.setItem('food', newFoodValue.toString());
      }
    }
    localStorage.setItem('lastUpdateTime', now.toString());

    const interval = setInterval(() => {
      setFood((prevFood) => {
        const newFoodValue = Math.max(prevFood - 1, 0);
        localStorage.setItem('food', newFoodValue.toString());
        localStorage.setItem('lastUpdateTime', Date.now().toString());
        if (newFoodValue !== 0) {
          localStorage.setItem('prochaineFamine', (Date.now() + (newFoodValue * intervalTime)).toString());
          console.log("new food value: ", formatDate(Date.now() + (newFoodValue * intervalTime)))
        }
        return newFoodValue;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const now = Date.now();
    const prochaineFamine = Number(localStorage.getItem('prochaineFamine'));

    console.log(formatDate(prochaineFamine), (now - prochaineFamine) / intervalTime)
    setHp(Math.max(hp - (now - prochaineFamine) / intervalTime, 0))
  }, [])

  return (
    <div className='contenant'>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        <Bare value={hp} valueMax={100} name="HP" />
        <Bare value={food} valueMax={100} name="Food" />
        <Bare value={joie} valueMax={100} name="Happy" />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        <button onClick={() => setHp(hp => Math.min(hp + 10, 100))}>Heal</button>
        <button onClick={() => setFood(food => Math.min(food + 10, 100))}>Feed</button>
        <button onClick={() => setJoie(joie => Math.min(joie + 10, 100))}>Branle</button>
      </div>
      <div className='game'></div>
    </div>
  )
}

export default App
