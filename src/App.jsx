import { useState } from "react"
import Hero from "./components/Hero"
import Generator from "./components/Generator"
import Workout from "./components/Workout"
import { generateWorkout } from "./utils/functions"
import "./index.css"
import Footer from "./components/Footer"
import Exploration from "./components/Exploration"
import FeatureSection from "./components/FeatureSection"
import Video from "./components/Video"
import FeatureSection2 from "./components/FeatureSection2"

function App() {
  const [workout, setWorkout] = useState(null)
  const [poison, setPoison] = useState("individual")
  const [muscles, setMuscles] = useState([])
  const [goals, setGoals] = useState("strength_power")

  function updateWorkout() {
    if (muscles.length < 1) {
      return
    }
    const newWorkout = generateWorkout({ poison, muscles, goals })
    setWorkout(newWorkout)
    window.location.href = "#workout"
  }

  return (
    <div className="min-h-screen">
      <section id="home">
        <Hero />
      </section>
      <section>
        <Exploration />
      </section>
      <section className="min-h-screen text-white">
        <FeatureSection />
      </section>
      <section>
        <Video />
      </section>
      {/* <section id="generate" className="bg-gradient-to-br from-black via-blue-900 to-black">
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
      )} */}
      <section>
        <FeatureSection2 />
      </section>
      <section id="footer" className="bg-black">
        <Footer />
      </section>
    </div>
  )
}

export default App
