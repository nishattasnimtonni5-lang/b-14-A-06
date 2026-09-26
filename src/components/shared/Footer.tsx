import Image from 'next/image';
import React from 'react';
import NavImage  from '@/assets/logo.png';

const Footer = () => {
    return (
        <div className='pt-8'>
 <hr className=' w-full py-1 border-gray-500'/>
            <footer className="footer sm:footer-horizontal flex justify-between footer-center bg-black text-base-content h-20  p-4">
 <div className="flex items-center gap-2 pl-20">
     <Image src={NavImage} alt="navbarimage" width={20} height={40} />
   <h4 className='text-white'> FITLOG</h4>
   </div>
  <aside>
    <p className='text-gray-500 pr-5'>© {new Date().getFullYear()} - Workout Library. Train hard,log honest.</p>
  </aside>
</footer>
 
        </div>
    );
};

export default Footer;