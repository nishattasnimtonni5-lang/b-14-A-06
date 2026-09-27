'use client'
import { PlanContext } from '@/app/context/PlanContext';
import React, { useContext } from 'react';

interface PlanAndSavedProps{
    type?:'today'|'saved'
}
const PlanCount = ({type}:PlanAndSavedProps) => {
    const context=useContext(PlanContext)
    if(!context){
        return null;
    }
    const {todayPlan,savedPlan}=context;
    return (
        <div className='bg-[#C2F800] text-black px-2 rounded-full '>
            {type=== 'today' ?todayPlan.length:savedPlan.length}
        </div>
    );
};

export default PlanCount;