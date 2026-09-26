import Image from 'next/image';
import React from 'react';
import BannerImg from '@/assets/banner.png'
import Link from 'next/link';
const BannerPage = () => {
    return (
        <div className='px-6 rounded-2xl py-5'>
        <div className='bg-[#222630] h-120 flex justify-between items-center rounded-2xl'>
           
<div className='px-20'>
               <p className='text-[#C2F800] text-xs py-5 font-bold'> WORKOUT LIBRARY
                </p>  
                 
                 <div className='text-white font-bold text-4xl'>
                <h2 >TRAIN WITH INTENT.LOG</h2>
                <h2>EVERY SET.</h2>
                </div>
                <div className='py-7'>
                <p className='text-[#9CA3AF]'>FitLog is a dark, no-nonsense gym companion: pick a lift, lock it</p>

<p className=' text-[#9CA3AF]'>into today&apos;s plan, and watch the week&apos;s work add up.</p>
       </div>
      <Link href="#workouts" className='bg-[#C2F800] px-5 py-2 rounded-2xl text-sm ' >BROWSE WORKOUTS</Link>
        </div> 
        <Image src={BannerImg} alt="Banner" className='mx-35'/>
        
    
        </div>
   </div> );
};

export default BannerPage;