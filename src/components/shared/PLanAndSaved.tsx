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
        <div>
            {type=== 'today' ?todayPlan.length:savedPlan.length}
        </div>
    );
};

export default PlanCount;