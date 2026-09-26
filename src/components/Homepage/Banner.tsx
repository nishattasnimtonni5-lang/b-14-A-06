import Image from 'next/image';
import React from 'react';
import BannerImg from '@/assets/banner.png'
const BannerPage = () => {
    return (
        <div className='bg-[#222630] h-120 flex justify-between items-center '>
           
<div className='px-20'>
               <p className='text-[#C2F800] font-bold'> WORKOUT LIBRARY
                </p>  
                 
                 <div className='text-white font-bold text-4xl'>
                <h2 >TRAIN WITH INTENT.LOG</h2>
                <h2>EVERY SET.</h2>
                </div>
                <p className='text-[#9CA3AF]'>FitLog is a dark, no-nonsense gym companion: pick a lift, lock it</p>

<p className='text-[#9CA3AF]'>into today&apos;s plan, and watch the week&apos;s work add up.</p>
       </div> 
        <Image src={BannerImg} alt="Banner" className='mx-35'/>
        
    
        </div>
    );
};

export default BannerPage;