'use client';
import { PlanContext } from '@/app/context/PlanContext';
import WorkoutCard from '@/components/shared/WorkoutCard';
import { Iworkout } from '@/types/workout.type';
import Image from 'next/image';
import React, { useContext } from 'react';

const MyPlan = () => {
   const context=useContext(PlanContext)
   if (!context){
    return null;
   }
   const {todayPlan,setTodayPlan,savedPlan,setSavedPlan}=context;
   const totalCalories=todayPlan.reduce(
    (total,workout)=>total+ Number(workout.caloriesBurned),0)
   const totalTime=todayPlan.reduce(
    (total,workout)=>total+ Number(workout.duration),0)
   const handleRemove=(id:string)=>{
    setTodayPlan(todayPlan.filter((workout)=>String(workout.id)!==String(id)))
   }
    return (
        <div className=""> 
            <h1>Todays Plan</h1>
      <div className="bg-gray-200 w-full  flex justify-between items-center px-20 py-10 rounded-lg h-40">
        <div>
            <p>Exercises</p>
        <h2>{todayPlan.length}</h2>
        </div>
        <div>
            <p>Minutes</p>
            <h2
            >{totalTime}</h2>
            </div>
    <div>
        <p>Calories</p>
        <h2>{totalCalories}</h2>
        </div>
     
      </div>




            {todayPlan.length>0?(
     <div className='grid grid-cols-1 w-full bg-gray-200'>
           { todayPlan.map((workout:Iworkout,ind:number)=>{
            return (<div key={ind} className="flex justify-between">
                <div>
                    <Image src={workout.image} alt="workoutImage" width={100} height={100} className='rounded-lg'/>
               <h3>{workout.name}</h3>
               <div className="flex gap-5">
                <h2>{workout.duration}</h2>
                <h2>{workout.caloriesBurned}</h2>
                <h2>{workout.rating}</h2>
            </div> 
           
              </div>
              <div>
               <button
               
               className="bg-gray-200 rounded-md">View Details</button>
              <button 
              onClick={()=>
                handleRemove(String(workout.id))
               }
              className="bg-red-500 rounded-md">Mark as done</button>
                </div>
            </div>)
            })}
           
     </div> 
        ):( <p>No Plan today</p>)}
            
           
        </div>
    );
}

export default MyPlan;