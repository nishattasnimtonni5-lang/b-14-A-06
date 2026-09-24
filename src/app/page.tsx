import BannerPage from '@/components/Homepage/Banner';
import WorkoutList from '@/components/Homepage/WorkoutList';
import React from 'react';

const page = () => {
  return (
    <div>
      <BannerPage/>
      <WorkoutList/>
    </div>
  );
};

export default page;