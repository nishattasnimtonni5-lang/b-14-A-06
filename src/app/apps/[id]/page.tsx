import WorkoutAddButton from '@/components/Apps/WorkoutAddButton';
import { getWorkoutDetails } from '@/lib/Apps';
import { IWorkoutDetailsProps } from '@/types/workout.type';
import Image from 'next/image';
import React from 'react';
const workoutDetails =async ({params}:IWorkoutDetailsProps) => {
  const {id}=await params;
  const data=await getWorkoutDetails(id);
    return (
    <div className='flex gap-6'>
        <div>
            {data?.image&&(
            <Image src={data.image} alt="workoutImage" width={500} height={200}/>
       
            )}
            </div>
            <div>
                 <p className='text-4xl font-bold'>{data.name}</p>
       <p>{data.equipment}</p>
                  <div className='flex gap-3 py-4'>
            {data.muscleGroups?.map((group,index)=>(
<span key={index} className=' rounded-lg px-3  '>{group}</span>
            ))}
             </div>
             <div className='w-80  bg-[#232834] rounded-lg '>
<div className='flex justify-between py-2 border-b text-white px-5'>
    <h4>EQUIPMENT</h4>
    <h4>{data.equipment}</h4>
    </div>
    <div className='flex justify-between py-2 border-b text-white px-5'>
<h4>DIFFICULTY</h4>
<h4>{data.difficulty}</h4>
</div>
<div className='flex justify-between py-2 border-b text-white px-5 '>
<h4>SETS</h4>
<h4>{data.sets}</h4></div>
<div className='flex justify-between py-2 border-b text-white px-5'>
<h4>REPS</h4>
<h4>{data.reps}</h4></div>
<div className='flex justify-between py-2 border-b text-white px-5'>
<h4>DURATION</h4>
<h4>{data.duration}</h4></div>
<div className='flex justify-between py-2 border-b text-white px-5'>
<h4>CALORIES</h4><h4>{data.caloriesBurned}</h4>
</div>
<div className='flex justify-between py-2 border-b text-white px-5' >
<h4>RATING</h4>
<h4>{data.rating}</h4>
</div>



             </div>
             <h2 className='text-2xl text-white'>INSTRUCTIONS</h2>
              <ol className='list-decimal py-2'>
 {data.instructions?.map((step,index)=>(
<li key={index} >{step}</li>
            ))}
            </ol>
           
           <WorkoutAddButton data={data}/>
        
           </div>
        </div>
    );
};

export default workoutDetails;