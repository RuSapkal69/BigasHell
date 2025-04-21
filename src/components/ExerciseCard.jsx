import React, {useState} from 'react';
import { Check, X } from 'lucide-react'

const ExerciseCard = (props) => {
  const { exercise, i } = props;
  const [setsCompleted, setSetsCompleted] = useState(0);
  const [setConfirmed, setSetConfirmed] = useState(null) // null, true, false

  function handleSetIncrement() {
    setSetsCompleted((setsCompleted + 1) % 6)
    setSetConfirmed(null)
  }

  const handleConfirm = (isCorrect) => {
    if (isCorrect) {
      setSetConfirmed(true)
    } else {
      // reset to show increment option again
      setSetsCompleted(0)
      setSetConfirmed(null)
    }
  }

  return (
    <div className="p-4 bg-slate-950 rounded-md text-white flex flex-col gap-6 overflow-auto">
      {/* Header Section */}
      <div className="flex flex-row items-center gap-x-6">
        <h4 className="text-3xl md:text-5xl font-semibold text-slate-400">
          0{i + 1}
        </h4>
        <h2 className="capitalize text-lg md:text-2xl font-medium flex-1 truncate">
          {exercise.name.replaceAll("_", " ")}
        </h2>
        <p className="capitalize text-sm text-slate-400 font-semibold">
          {exercise.type}
        </p>
      </div>

      {/* Details Section */}
      <div className="flex flex-col gap-4">
        {/* Muscle Groups */}
        <div className="flex flex-col">
          <h3 className="text-slate-400 text-sm">Muscle Groups</h3>
          <p className="capitalize">{exercise.muscles.join(" & ")}</p>
        </div>

        <div className='flex flex-col bg-slate-950 rounded gap-2 p-2'>
            {exercise.description.split('__').map((val) => {
                return (
                    <div className='text-sm'>
                        {val}
                    </div>
                )
            })}
        </div>


        {/* Reps, Rest, Tempo Section */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {["reps", "rest", "tempo"].map((info) => (
            <div
              key={info}
              className="flex flex-col items-center p-2 rounded border border-slate-900"
            >
              <h3 className="capitalize text-sm text-slate-400">
                {info === "reps" ? `${exercise.unit}` : info}
              </h3>
              <p className="font-medium">{exercise[info]}</p>
            </div>
          ))}
          {setsCompleted < 5 && (
        <button
          onClick={handleSetIncrement}
          className='flex flex-col p-2 rounded border-[1.5px] 
            border-solid border-blue-900 hover:border-blue-600 w-full duration-200'
        >
          <h3 className='capitalize text-sm text-slate-400'>sets Completed</h3>
          <p className='font-medium'>{setsCompleted} / 5</p>
        </button>
      )}

      {setsCompleted === 5 && setConfirmed === null && (
        <div className='flex justify-between gap-2'>
          <button
            onClick={() => handleConfirm(true)}
            className='flex-1 flex items-center justify-center gap-2 p-2 rounded border border-green-600 text-green-600 hover:bg-green-50 duration-200'
          >
            <Check size={12} /> Correct
          </button>
          <button
            onClick={() => handleConfirm(false)}
            className='flex-1 flex items-center justify-center gap-2 p-2 rounded border border-red-600 text-red-600 hover:bg-red-50 duration-200'
          >
            <X size={12} /> Wrong
          </button>
        </div>
      )}

      {setConfirmed === true && (
        <div
          className='flex flex-col p-2 rounded border-[1.5px] border-green-700 w-full bg-green-50 text-green-700 duration-200'
        >
          <h3 className='font-semibold capitalize text-sm'>Set Completed</h3>
        </div>
      )}
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;
