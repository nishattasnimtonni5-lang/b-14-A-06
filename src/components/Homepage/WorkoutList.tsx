import { getAllCategory } from '@/lib/Apps';
import { Iworkout } from '@/types/workout.type';
import React, { Suspense } from 'react';
import WorkoutCard from '../shared/WorkoutCard';

const WorkoutSkeleton = () => {
  return (
    <div className="md:grid md:grid-cols-3 gap-3 px-5">
      {[1, 2, 3, 4, 5, 6].map((index) => (
        <div
          key={index}
          className="animate-pulse bg-[#1c1c1c] rounded-xl overflow-hidden"
        >
          <div className="w-full h-52 bg-gray-800"></div>

          <div className="p-5">
            <div className="h-5 bg-gray-800 rounded w-3/4 mb-4"></div>

            <div className="h-4 bg-gray-800 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-800 rounded w-2/3 mb-5"></div>

            <div className="flex justify-between">
              <div className="h-4 bg-gray-800 rounded w-20"></div>
              <div className="h-4 bg-gray-800 rounded w-16"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const WorkoutContent = async () => {
  const data = await getAllCategory();

  return (
    <div className='md:grid md:grid-cols-3 gap-3 px-5'>
      {data.map((workout: Iworkout, ind: number) => (
        <WorkoutCard key={ind} workout={workout} />
      ))}
    </div>
  );
};

const WorkoutList = () => {
  return (
    <section id="workouts">
      <h2 className='text-white pl-10 text-xl pb-2 pt-5'>THE LIBRARY</h2>
      <p className='text-[#9CA3AF] pl-10 pb-4'>Twelve lifts covering every major muscle group.</p>
      
      <Suspense fallback={<WorkoutSkeleton />}>
        <WorkoutContent />
      </Suspense>
    </section>
  );
};

export default WorkoutList;