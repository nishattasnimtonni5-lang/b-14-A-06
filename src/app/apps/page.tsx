'use client';
import { PlanContext } from '@/app/context/PlanContext';

import { Iworkout } from '@/types/workout.type';
import Image from 'next/image';
import React, { useContext,useState } from 'react';
import Link from 'next/link';
import { MdDone } from 'react-icons/md'
import { BiTime } from 'react-icons/bi'
import { GoFlame } from 'react-icons/go'
import { FiStar } from 'react-icons/fi'
import { ImCross } from "react-icons/im";
import { toast } from 'react-toastify';
const MyPlan = () => {
   const context=useContext(PlanContext)
   const [activeTab,setActiveTab]=useState("today")
    const [sortBy,setSortBy]=useState('default')
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
   const handleRemove=(id:string,name:string)=>{
    
    setTodayPlan(todayPlan.filter((workout)=>String(workout.id)!==String(id)));
    toast.success(`${name} removed succesfully!`)
   }
   const handleRemovedSaved=(id:string,name:string)=>{
    
    setSavedPlan(savedPlan.filter((workout)=>String(workout.id)!==String(id)));
    toast.success(`${name} removed succesfully!`)
   }
  
   const currentPlan=activeTab==='today'?todayPlan:savedPlan;
   const sortedPlan=[...currentPlan].sort((a,b)=>{
    if(sortBy==='duration'){
      return Number(b.duration)-Number(a.duration)
    };
    if(sortBy==='calories'){
      return Number(b.caloriesBurned)-Number(a.caloriesBurned)
    };
    if(sortBy==='rating'){
      return Number(b.rating)-Number(a.rating)
    };
    return 0;
   })
    return (
        <div className="px-8"> 
        <h2 className="text-white text-2xl pl-7 py-3">My Plan</h2>
         <p className="text-gray-500 pl-7 pb-5">Cap of five lifts for today. Finish them, then load more.</p>
        
         
      <div className="bg-gray-900 w-full  flex justify-between items-center px-20 py-10 rounded-lg h-40">
        <div>
            <p className="text-gray-500">Exercises</p>
        <h2 className=" text-3xl text-center text-[#C2F800]">
          {activeTab==="today"?todayPlan.length:savedPlan.length}</h2>
        </div>
        <div>
            <p className="text-gray-500">Minutes</p>
            <h2 className="text-center text-[#C2F800] text-3xl"
            >{activeTab==="today"?totalTime:savedTime}</h2>
            </div>
    <div>
        <p className="text-gray-500">Calories</p>
        <h2 className="text-center text-[#C2F800] text-3xl">{activeTab==="today"? totalCalories:savedCalories}</h2>
        </div>
     
      </div>
      <div className="py-5 flex justify-between">
         <div className="flex gap-1 px-2  bg-gray-800 w-50 items-center rounded-2xl h-15 py-5"> 
          <button
          onClick={()=>
            setActiveTab("today")
          }
          className={`px-3 py-3  rounded-lg ${activeTab==='today'?" text-[#C2F800] bg-black ":" text-gray-500"}`}>Today&apos;s Plan </button>
          
           <button
          onClick={()=>
            setActiveTab("saved")
          }  className={`px-5 py-2 rounded-lg ${activeTab==='saved'?"text-[#C2F800] bg-black":" text-gray-500"}`}>Saved </button>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-gray-500">
              Sort by
              </label >
              <select value={sortBy}
              onChange={(e)=>setSortBy(e.target.value)}
              className="text-gray-500 border rounded-xl px-2 py-2">
                <option value="default">Default</option>
                <option value="duration">Duration</option>
                <option value="rating">Rating</option>
                <option value="calories">Calories</option>
                </select>
          </div>
</div>
     {activeTab==="today"&&(
      <>

            {todayPlan.length>0?(
     <div className='md:grid md:grid-cols-1 w-full gap-2  rounded-md'>
           { sortedPlan.map((workout:Iworkout,ind:number)=>{
            return (<div key={ind} className="flex items-center justify-between rounded-xl bg-gray-900 gap-4 md:gap-0">
                <div className="md:px-5 py-5 flex md:gap-5 gap-1">
                    <Image src={workout.image} alt="workoutImage" width={100} height={50} className='rounded-lg md:w-35 w-10 md:h-20 '/>
             <div >
               <h3 className="text-white pb-2">{workout.name}</h3>
               <div className="flex md:gap-5">
                 <h4 className="flex items-center gap-1 text-white "><BiTime className="text-[#C2F800]"/>{workout.duration}</h4>
                       <h4 className="flex items-center gap-1 text-white">< GoFlame className="text-[#C2F800]"/>{workout.caloriesBurned}</h4>
                       <h4 className="flex items-center gap-1 text-white">< FiStar className="text-[#C2F800]"/>{workout.rating}</h4>
                  </div>    
            </div> 
           
              </div>
              <div className="flex gap-2  md:gap-4  px-10">
               <button
               
               className="border border-gray-500 text-white hover:bg-white hover:text-black md:px-4 py-2 rounded-3xl"><Link href={`/apps/${workout.id}`}>View Details</Link></button>
             
             <div className="flex gap-3">
              <button 
              onClick={()=>
                handleRemove(String(workout.id),workout.name)
               }
              className="bg-[#C2F800] md:px-3  py-2 hover:bg-yellow-400 flex items-center gap-1   rounded-3xl"><MdDone/>Mark as done</button>
                <button
             onClick={()=>
              handleRemove(String(workout.id),workout.name)
             }
            className='hover:text-red-500 text-gray-400'
            ><ImCross /></button>
              </div> 
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
      <div className='grid grid-cols-1 w-full rounded-md gap-2'>
           { sortedPlan.map((workout:Iworkout,ind:number)=>{
            return (<div key={ind} className="flex items-center justify-between  bg-gray-900  md:px-5 gap-4 md:gap-0 rounded-xl" >
                <div className=" py-5 flex gap-5">
                    <Image src={workout.image} alt="workoutImage" width={100} height={50} className='rounded-lg w-10 md:w-35 h-20 '/>
             <div >
               <h3 className="text-white pb-2">{workout.name}</h3>
               <div className="flex gap-5">
                 <h4 className="flex items-center gap-1 text-white "><BiTime className="text-[#C2F800]"/>{workout.duration}</h4>
                       <h4 className="flex items-center gap-1 text-white">< GoFlame className="text-[#C2F800]"/>{workout.caloriesBurned}</h4>
                       <h4 className="flex items-center gap-1 text-white">< FiStar className="text-[#C2F800]"/>{workout.rating}</h4>
                  </div>    
            </div> 
           
              </div>
              <div className='flex gap-1 md:gap-3'>
              
              <button 

              className="border border-gray-500 text-gray-500 md:px-3 py-2  rounded-3xl hover:bg-white hover:text-black"><Link href={`/apps/${workout.id}`}>View Details</Link></button>
             <button
             onClick={()=>
              handleRemovedSaved(String(workout.id),workout.name)
             }
            className='hover:text-red-500 text-gray-400'
            ><ImCross /></button>
                </div>
            </div>)
            })}
           
     </div> 
        ):( 
        <div className="text-center"> 
          <p className="text-gray-500 text-xl">No saved plan</p>
          <p className="text-gray-500 pb-8">Browse the library and save a lift to get today moving.</p>
        <button><Link href='/' className="bg-[#C2F800] px-4 py-2 rounded-xl ">Go to workouts</Link></button>
        </div>)}
            
            </>
         )}

        </div>
    );
}

export default MyPlan;