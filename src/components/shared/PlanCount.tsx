'use client'
import { PlanContext } from '@/app/context/PlanContext';
import React, { useContext } from 'react';

const PlanCount = () => {
    const context=useContext(PlanContext)
    if(!context){
        return null;
    }
    const {todayPlan}=context;
    return (
        <div>
            {todayPlan.length}
        </div>
    );
};

export default PlanCount;