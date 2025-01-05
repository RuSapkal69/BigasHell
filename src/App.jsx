import React, {useState}from "react";
import Hero from './components/Hero'
import Generator from './components/Generator'
import Workout from './components/Workout'
import { generateWorkout } from "./utils/functions";
import Footer from './components/Footer'

function App() {

  const [workout, setWorkout] =useState(null);
  const [poison, setPoison] = useState('individual');
  const [muscles, setMuscles] = useState([]);
  const [goals, setGoals] = useState('strength_power');

  function updateWorkout() {

    if (muscles.length < 1) {
      return;
    }
    let newWorkout = generateWorkout({poison, muscles, goals});
   
    setWorkout(newWorkout);

    window.location.href = "#workout";

  }

  return (
    <div className="gym min-h-screen bg-gradient-to-br from-black via-blue-900 to-black bg-[length:200%_200%] animate-gradient">
      <Hero />
      <Generator 
      poison={poison} 
      setPoison={setPoison}
      muscles={muscles}
      setMuscles={setMuscles}
      goals={goals}
      setGoals={setGoals} 
      updateWorkout={updateWorkout}/>
      {workout && <Workout workout={workout} />}
      <Footer />
    </div>
  )
}

export default App
