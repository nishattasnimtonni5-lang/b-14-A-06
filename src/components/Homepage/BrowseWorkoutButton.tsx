'use client'
import React from 'react';

const BrowseWorkoutButton = () => {
    const handleBrowseClick=()=>{
        document.getElementById('workouts')?.scrollIntoView({
            behavior:'smooth',
            block:'start'
        });
    };
    return (
        <div>
            <button
     onClick={handleBrowseClick}
     className='bg-[#C2F800] hover:bg-white hover:text-black px-5 py-2 rounded-2xl text-sm '>
      BROWSE WORKOUTS
            </button>
        </div>
    );
};

export default BrowseWorkoutButton;