
import React from 'react';
import NavImg from "@/assets/logo.png"
import Image from 'next/image';
import Link from 'next/link';
import PlanCount from './PLanAndSaved';
const NavBar = () => {

    return (
        
            <nav className="navbar bg-base-100 shadow-sm flex justify-between items-center">
  <div className="flex">
    <Image src={NavImg} alt="navbarimage" width={50} height={50} className=""/>
  <h4> FITLOG</h4>
  </div>
 
   <ul className='flex gap-4'>
    <li>
      <Link href='/'>WORKOUT</Link></li>
    <li><Link href='/apps'>MY PLAN</Link></li>
       </ul>
       
        <ul className='flex gap-4'>
         <li> <Link href="/apps">PLAN <PlanCount type='today'/></Link></li>
          <li><Link href="/apps">SAVED<PlanCount type='saved'/></Link></li>
        </ul>
       </nav>
        
    );
};

export default NavBar;