import { Iworkout } from '@/types/workout.type';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import WorkoutAddButton from './../Apps/WorkoutAddButton';
interface IWorkoutProps{
    workout:Iworkout;
}
const WorkoutCard = ({workout}:IWorkoutProps) => {
    return (
        <Link href={`/apps/${workout.id}`}>
        <div className='border border-gray-500 pb-5 rounded-lg overflow-hidden '>
            <Image src={workout.image} alt="workoutImg" width={150} height={100} className=' w-full h-70' />
          <div>
           <div className='flex gap-3 py-4'>
            {workout.muscleGroups?.map((group,index)=>(
<span key={index} className='bg-[#C2F800] rounded-lg px-3  '>{group}</span>
            ))}
             </div>
        <div className=''>
       <p>{workout.name}</p>
       <p>{workout.equipment}</p>
      </div>
      <div className='flex gap-10'>
       <h4>{workout.duration}</h4>
       <h4>{workout.caloriesBurned}</h4>
       <h4>{workout.rating}</h4>
      
       </div>
      
       </div>
        
       </div>
   </Link> );
};

export default WorkoutCard;