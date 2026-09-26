
import React from 'react';
import NavImg from "@/assets/logo.png"
import Image from 'next/image';
import Link from 'next/link';
import PlanCount from './PLanAndSaved';
const NavBar = () => {

    return (
        <div>
            <nav className="navbar shadow-sm flex justify-between items-center bg-black">
  <div className="flex items-center gap-5 pl-20">
    <Image src={NavImg} alt="navbarimage" width={30} height={40} />
  <h4 className='text-white'> FITLOG</h4>
  </div>
 
   <ul className='flex gap-4'>
    <li>
      <Link href='/' className='text-[#C2F800] px-3 py-1 rounded-2xl bg-[#C2F800]/20'>WORKOUT</Link></li>
    <li><Link href='/apps' className='text-gray-500'>MY PLAN</Link></li>
       </ul>
       
        <ul className='flex gap-4 px-10'>
         <li> <Link href="/apps" className='text-gray-500'>PLAN <PlanCount type='today'/></Link></li>
          <li><Link href="/apps" className='text-gray-500'>SAVED<PlanCount type='saved'/></Link></li>
        </ul> 
         </nav>
       
        <hr className=' w-full py-1 border-gray-500'/>
    
   
        </div>
    );
};

export default NavBar;