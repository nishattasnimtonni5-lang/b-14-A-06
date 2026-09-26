'use client'


import { PlanContext } from '@/app/context/PlanContext';
import { Iworkout } from '@/types/workout.type';
import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import { BiCalendarCheck } from 'react-icons/bi';
import { BsBookmarkFill } from 'react-icons/bs'
const WorkoutAddButton = ({data}:{data:Iworkout}) => {
const context=useContext(PlanContext)
if(!context){
    return null;
}
const {todayPlan=[],setTodayPlan,savedPlan=[],setSavedPlan}=context;
const handleAdd=()=>{
    setTodayPlan([...todayPlan,data]);
    toast.success(`${data.name} added to today's plan.`)
}
const handleSave=()=>{
    setSavedPlan([...savedPlan,data]);
    toast.success(`${data.name} added to saved plan.`)
}
    return (
        <div className='flex gap-5 pt-4'>
            <button onClick={()=>handleAdd()}
            className='bg-[#C2F800] py-3 px-3 rounded-lg  hover:bg-yellow-500 hover:text-black flex gap-1 items-center'><BiCalendarCheck/>  Add to today&apos;s plan</button>
                   <button 
                   onClick={()=>handleSave()}
               className='border border-gray-700 py-3 px-3 rounded-lg text-gray-500 hover:bg-white hover:text-black flex gap-1 items-center  ' ><BsBookmarkFill/>Save for later</button>
        </div>
    );
};

export default WorkoutAddButton;