'use client'


import { PlanContext } from '@/app/context/PlanContext';
import { Iworkout } from '@/types/workout.type';
import React, { useContext } from 'react';
import { toast } from 'react-toastify';

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
        <div className='gap-5'>
            <button onClick={()=>handleAdd()}
            className='bg-[#C2F800] py-3 px-3 rounded-lg'>Add to today@s plan</button>
                   <button 
                   onClick={()=>handleSave()}
                   >Save for later</button>
        </div>
    );
};

export default WorkoutAddButton;