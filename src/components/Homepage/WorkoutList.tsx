import { getAllCategory } from '@/lib/Apps';
import { Iworkout } from '@/types/workout.type';
import React from 'react';
import WorkoutCard from '../shared/WorkoutCard';

const WorkoutList =async () => {
    const data=await getAllCategory();
    return (
        <section id="workouts">
            <h2 className='text-white'>THE LIBRARY</h2>
            <p className='text-[#9CA3AF]'>Twelve lifts covering every major muscle group.</p>
        <div className='grid grid-cols-3 gap-3 px-5 '>
            {
                data.map((workout:Iworkout,ind:number)=>
                {return <WorkoutCard key={ind} workout={workout}/>
  }  )
            }
        </div>
        </section>
    );
};

export default WorkoutList;