import React, {useState} from 'react';

const ExerciseCard = (props) => {
  const { exercise, i } = props;
  const [setsCompleted, setSetsCompleted] = useState(0);

  function handleSetIncrement() {
    setSetsCompleted((setsCompleted + 1) % 6)
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
          <button onClick={handleSetIncrement} className='flex flex-col p-2 rounded border-[1.5px] 
          duration-200 border-solid border-blue-900 hover:border-blue-600 w-full duration-200'>
            <h3 className='capitalize text-sm text-slate-400'>
                sets Completed
            </h3>
            <p className='font-medium'>{setsCompleted} / 5</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;
