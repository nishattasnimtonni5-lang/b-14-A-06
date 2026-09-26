'use client';
import { PlanContext } from '@/app/context/PlanContext';
import WorkoutCard from '@/components/shared/WorkoutCard';
import { Iworkout } from '@/types/workout.type';
import Image from 'next/image';
import React, { useContext,useState } from 'react';
import Link from 'next/link';
import { MdDone } from 'react-icons/md'
import { BiTime } from 'react-icons/bi'
import { GoFlame } from 'react-icons/go'
import { FiStar } from 'react-icons/fi'

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
          className='px-5 py-2 bg-[#C2F800] rounded-lg'>Today&apos;s Plan </button>
          
           <button
          onClick={()=>
            setActiveTab("saved")
          } className="border border-gray-500 px-5 rounded-lg py-2 text-gray-500">Saved </button>
          </div>

     {activeTab==="today"&&(
      <>

            {todayPlan.length>0?(
     <div className='grid grid-cols-1 w-full bg-gray-900 rounded-md'>
           { todayPlan.map((workout:Iworkout,ind:number)=>{
            return (<div key={ind} className="flex items-center justify-between">
                <div className="px-5 py-5 flex gap-5">
                    <Image src={workout.image} alt="workoutImage" width={100} height={50} className='rounded-lg w-35 h-20 '/>
             <div >
               <h3 className="text-white pb-2">{workout.name}</h3>
               <div className="flex gap-5">
                 <h4 className="flex items-center gap-1 text-white "><BiTime className="text-[#C2F800]"/>{workout.duration}</h4>
                       <h4 className="flex items-center gap-1 text-white">< GoFlame className="text-[#C2F800]"/>{workout.caloriesBurned}</h4>
                       <h4 className="flex items-center gap-1 text-white">< FiStar className="text-[#C2F800]"/>{workout.rating}</h4>
                  </div>    
            </div> 
           
              </div>
              <div className="flex gap-4 px-10">
               <button
               
               className="border border-gray-500 text-white hover:bg-white hover:text-black px-4 py-2 rounded-3xl">View Details</button>
              <button 
              onClick={()=>
                handleRemove(String(workout.id))
               }
              className="bg-[#C2F800] px-3 py-2 hover:bg-yellow-400 flex items-center gap-1   rounded-3xl"><MdDone/>Mark as done</button>
                </div>
            </div>)
            })}
           
     </div> 
        ):(<div className="text-center"> 
          <p className="text-gray-500 text-xl">No Plan today</p>
          <p className="text-gray-500 pb-8">Browse the library and add a lift to get today moving.</p>
        <button><Link href="/" className="bg-[#C2F800] px-4 py-2 rounded-xl ">Go to workouts</Link></button>
        </div>
         
        )}
            
            </>
         )}



        {activeTab==="saved" &&(
          <>

            {savedPlan.length>0?(
      <div className='grid grid-cols-1 w-full bg-gray-900 rounded-md'>
           { savedPlan.map((workout:Iworkout,ind:number)=>{
            return (<div key={ind} className="flex items-center justify-between pr-10 pl-3 ">
                <div className="px-5 py-5 flex gap-5">
                    <Image src={workout.image} alt="workoutImage" width={100} height={50} className='rounded-lg w-35 h-20 '/>
             <div >
               <h3 className="text-white pb-2">{workout.name}</h3>
               <div className="flex gap-5">
                 <h4 className="flex items-center gap-1 text-white "><BiTime className="text-[#C2F800]"/>{workout.duration}</h4>
                       <h4 className="flex items-center gap-1 text-white">< GoFlame className="text-[#C2F800]"/>{workout.caloriesBurned}</h4>
                       <h4 className="flex items-center gap-1 text-white">< FiStar className="text-[#C2F800]"/>{workout.rating}</h4>
                  </div>    
            </div> 
           
              </div>
              <div>
              
              <button 
              onClick={()=>
                handleRemove(String(workout.id))
               }
              className="border border-gray-500 text-gray-500 px-3 py-2  rounded-3xl hover:bg-white hover:text-black"><Link href={`/apps/${workout.id}`}>View Details</Link></button>
                </div>
            </div>)
            })}
           
     </div> 
        ):( 
        <div className="text-center"> 
          <p className="text-gray-500 text-xl">No saved plan</p>
          <p className="text-gray-500 pb-8">Browse the library and save a lift to get today moving.</p>
        <button><Link href='/apps' className="bg-[#C2F800] px-4 py-2 rounded-xl ">Go to workouts</Link></button>
        </div>)}
            
            </>
         )}

        </div>
    );
}

export default MyPlan;