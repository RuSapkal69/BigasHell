import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from './SectionWrapper';
import { WORKOUTS } from '../utils/soldier.js';
import { SCHEMES } from '../utils/soldier.js';

function Header(props) {
  const { index, title, description } = props;

  return (
    <div className="flex flex-col gap-6 items-center my-10">
      <div className="flex items-center gap-2">
        <p className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-400">{index}</p>
        <h3 className="text-white text-5xl sm:text-3xl md:text-5xl text-center">{title}</h3>
      </div>
      <p className="text-white font-semibold text-sm sm:text-base mx-auto">{description}</p>
    </div>
  );
}


// Parent and Child Variants
const parentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.8, // Delay between children animations
    },
  },
};

const slideVariant = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};


const Generator = (props) => {
  const [showModal, setShowModal] = useState(false);
  const { poison, setPoison, muscles, setMuscles, goals, setGoals, updateWorkout } = props;
  const toggleModal = () => setShowModal(!showModal);

  const updateMuscles = (muscleGroup) => {
    if (muscles.includes(muscleGroup)) {
      setMuscles(muscles.filter((val) => val !== muscleGroup));
      return;
    }
    if (muscles.length > 2) return;

    if (poison !== 'individual') {
      setMuscles([muscleGroup]);
      setShowModal(false);
      return;
    }

    setMuscles([...muscles, muscleGroup]);
    if (muscles.length === 2) setShowModal(false); // Close modal on selecting the 3rd muscle
  };

  return (
    <SectionWrapper id={'generate'} header="GENERATE YOUR WORKOUT" title={['It\'s', 'TORTURE', 'time']}>
      {/* Header and content section with fade-in animation */}
      <motion.div
        variants={parentVariants} // Apply parent variants
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }} // Replay animation when scrolling back // Trigger animation when 50% of the parent comes into view
      >
        <Header index="01" title="Select your Punishment" description="Select the way your body should be burned." />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Object.keys(WORKOUTS).map((type, typeIndex) => (
            <motion.button
              key={typeIndex}
              onClick={() => setMuscles([]) || setPoison(type)}
              className={`text-white bg-slate-950 border py-4 rounded-lg duration-200 ${
                type === poison ? 'border-red-700 text-red-700' : 'border-blue-400 hover:border-red-700 hover:text-red-700'
              }`}
              variants={slideVariant}
            >
              <p className="capitalize">{type.replaceAll('_', ' ')}</p>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Another Header and content section with fade-in animation */}
      <motion.div
        variants={parentVariants} // Apply parent variants
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }} // Replay animation when scrolling back
      >
        <Header index="02" title="Lock on the tortures" description="Select the muscles to be tortured." />
      <div className="bg-slate-950 border border-blue-400 duration-200 hover:border-red-700 rounded-lg flex flex-col">
        <motion.button variants={slideVariant} onClick={toggleModal} className="relative flex items-center justify-center p-4">
          <p className="text-white uppercase">{muscles.length == 0 ? 'Select muscle groups' : muscles.join(' ')}</p>
          <i className="fa-solid absolute right-3 top-1/2 -translate-y-1/2 fa-caret-down text-white"></i>
        </motion.button>
        {showModal && (
          <div className="text-white flex flex-col px-4 py-4">
            {(poison === 'individual' ? WORKOUTS[poison] : Object.keys(WORKOUTS[poison]) || []).map(
              (muscleGroup, muscleGroupIndex) => (
                <button
                  key={muscleGroupIndex}
                  onClick={() => updateMuscles(muscleGroup)}
                  className={`hover:text-red-700 duration-200 ${
                    muscles.includes(muscleGroup) ? 'text-red-700' : ''
                  }`}
                >
                  <p className="uppercase">{muscleGroup}</p>
                </button>
              )
            )}
          </div>
        )}
      </div>
      </motion.div>

      {/* Final Header and content section with fade-in animation */}
      <motion.div
        variants={parentVariants} // Apply parent variants
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }} // Replay animation when scrolling back
      >
        <Header index="03" title="Become the Devil" description="Select your final judgement." />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Object.keys(SCHEMES).map((scheme, schemeIndex) => (
            <motion.button
              key={schemeIndex}
              onClick={() => setGoals(scheme)}
              className={`text-white bg-slate-950 border py-4 px-4 rounded-lg duration-200 ${
                scheme === goals ? 'border-red-700 text-red-700' : 'border-blue-400 hover:border-red-700 hover:text-red-700'
              }`}
              variants={slideVariant}
            >
              <p className="capitalize">{scheme.replaceAll('_', ' ')}</p>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Button for generating tortures */}
      <div className="flex justify-center mt-10 mb-10">
        <motion.button
          onClick={updateWorkout}
          className="text-white text-lg font-bold px-6 py-3 bg-red-600 rounded-lg shadow-lg shadow-red-500/50 hover:shadow-red-700/70 hover:bg-red-700 hover:scale-105 transition-transform duration-300"
          variants={slideVariant}
        >
          Generate Tortures
        </motion.button>
      </div>
    </SectionWrapper>
  );
};

export default Generator;
