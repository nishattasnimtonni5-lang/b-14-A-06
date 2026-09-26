'use client';
import { PlanContext } from '@/app/context/PlanContext';
import WorkoutCard from '@/components/shared/WorkoutCard';
import { Iworkout } from '@/types/workout.type';
import Image from 'next/image';
import React, { useContext,useState } from 'react';

const MyPlan = () => {
   const context=useContext(PlanContext)
   const [activeTab,setActiveTab]=useState("today")
   if (!context){
    return null;
   }
   const {todayPlan,setTodayPlan,savedPlan,setSavedPlan}=context;
   
   const totalCalories=todayPlan.reduce(
    (total,workout)=>total+ Number(workout.caloriesBurned),0)
   const totalTime=todayPlan.reduce(
    (total,workout)=>total+ Number(workout.duration),0)
   const savedCalories=savedPlan.reduce(
    (total,workout)=>total+ Number(workout.caloriesBurned),0)
   const savedTime=savedPlan.reduce(
    (total,workout)=>total+ Number(workout.duration),0)
   const handleRemove=(id:string)=>{
    setTodayPlan(todayPlan.filter((workout)=>String(workout.id)!==String(id)))
   }
    return (
        <div className="px-8"> 
        <h2 className="text-white text-2xl pl-7 py-3">My Plan</h2>
         <p className="text-gray-500 pl-7 pb-5">Cap of five lifts for today. Finish them, then load more.</p>
        
         
      <div className="bg-gray-900 w-full  flex justify-between items-center px-20 py-10 rounded-lg h-40">
        <div>
            <p className="text-gray-500">Exercises</p>
        <h2 className="text-white">
          {activeTab==="today"?todayPlan.length:savedPlan.length}</h2>
        </div>
        <div>
            <p className="text-gray-500">Minutes</p>
            <h2 className="text-white"
            >{activeTab==="today"?totalTime:savedTime}</h2>
            </div>
    <div>
        <p className="text-gray-500">Calories</p>
        <h2 className="text-white">{activeTab==="today"? totalCalories:savedCalories}</h2>
        </div>
     
      </div>
         <div className="flex gap-5 py-5"> 
          <button
          onClick={()=>
            setActiveTab("today")
          }
          className='px-5 py-2 bg-[#C2F800] rounded-lg'>Today@s Plan </button>
          
           <button
          onClick={()=>
            setActiveTab("saved")
          } className="border border-gray-500 px-5 rounded-lg py-2 text-gray-500">Saved </button>
          </div>

     {activeTab==="today"&&(
      <>

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
        ):( <p>No Plan today</p>
         
        )}
            
            </>
         )}



        {activeTab==="saved" &&(
          <>

            {savedPlan.length>0?(
     <div className='grid grid-cols-1 w-full bg-gray-200'>
           { savedPlan.map((workout:Iworkout,ind:number)=>{
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
        ):( <p>No saved workout</p>)}
            
            </>
         )}

        </div>
    );
}

export default MyPlan;