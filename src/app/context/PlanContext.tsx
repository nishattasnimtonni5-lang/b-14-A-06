'use client'
import React, { createContext, ReactNode, useMemo, useSyncExternalStore } from 'react';

import { Iworkout } from '@/types/workout.type';
import {
  getPlanSnapshot,
  getServerSnapshot,
  setSavedPlan,
  setTodayPlan,
  subscribe,
} from './planStore';

interface PlanContextType{
    todayPlan:Iworkout[];
    setTodayPlan:React.Dispatch<React.SetStateAction<Iworkout[]>>
     savedPlan:Iworkout[];
    setSavedPlan:React.Dispatch<React.SetStateAction<Iworkout[]>>
}

export const PlanContext = createContext<PlanContextType|null>(null);

// Plans live in planStore (localStorage-backed) and are read with
// useSyncExternalStore: the server snapshot is empty so prerendered HTML
// matches, then the client re-renders with the stored plans after hydration —
// no setState-in-effect, no hydration mismatch.
const PlanProvider=({children}:{children:ReactNode}) => {
    const { todayPlan, savedPlan } = useSyncExternalStore(
      subscribe,
      getPlanSnapshot,
      getServerSnapshot
    );

    const value = useMemo(
      () => ({ todayPlan, setTodayPlan, savedPlan, setSavedPlan }),
      [todayPlan, savedPlan]
    );

    return (
       <PlanContext.Provider value={value}>
        {children}
       </PlanContext.Provider>
    );
};

export default PlanProvider;
