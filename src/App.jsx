import React, { useState } from "react";
import Hero from './components/Hero';
import Generator from './components/Generator';
import Workout from './components/Workout';
import { generateWorkout } from "./utils/functions";
import Footer from './components/Footer';

function App() {
  const [workout, setWorkout] = useState(null);
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

  // Make sure to add the gym background image to your public folder
  // The file should be named 'gym-background.jpg'

  return (
    <div className="min-h-screen">
      <section id="home">
        <Hero />
      </section>
      <section id="generate" className="bg-gradient-to-br from-black via-blue-900 to-black">
        <Generator 
          poison={poison} 
          setPoison={setPoison}
          muscles={muscles}
          setMuscles={setMuscles}
          goals={goals}
          setGoals={setGoals} 
          updateWorkout={updateWorkout}
        />
      </section>
      {workout && (
        <section id="workout" className="bg-gradient-to-br from-black via-blue-900 to-black">
          <Workout workout={workout} />
        </section>
      )}
      <section id="footer" className="bg-black">
        <Footer />
      </section>
    </div>
  );
}

export default App;