'use client'
import React, { createContext, ReactNode,  useState } from 'react';

import { Iworkout } from '@/types/workout.type';
interface PlanContextType{
    todayPlan:Iworkout[];
    setTodayPlan:React.Dispatch<React.SetStateAction<Iworkout[]>>
     savedPlan:Iworkout[];
    setSavedPlan:React.Dispatch<React.SetStateAction<Iworkout[]>>
}

export const PlanContext = createContext<PlanContextType|null>(null);
const PlanProvider=({children}:{children:ReactNode}) => {
    const[todayPlan,setTodayPlan]=useState<Iworkout[]>([]);
    const[savedPlan,setSavedPlan]=useState<Iworkout[]>([]);
  
    
    return (
       <PlanContext.Provider value={{todayPlan,setTodayPlan,savedPlan,setSavedPlan}}>{children}</PlanContext.Provider>
    );
};

export default PlanProvider;