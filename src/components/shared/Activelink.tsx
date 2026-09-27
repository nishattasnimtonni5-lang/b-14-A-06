'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";


const links:{name:string;href:string}[]=[
    {
        name:'Workouts',href:'/'},
      {   name:'My Plan',href:'/apps'
    }
]
const Activelink = () => {
 const pathname=usePathname();
    return (
        <div className="flex gap-3 md:gap-3 md:pl-0 pl-4 items-center">
            {links.map((link)=>(
                <Link key={link.href} href={link.href} className={pathname===link.href?'text-[#C2F800] bg-[#C2F800]/10 rounded-2xl px-1 md:px-4 md:text-lg py-2 md:py-2  border border-gray-500 ':'text-gray-500 text-lg px-1 md:px-4 py-1 md:py-2 hover:text-[#C2F800]'} >{link.name}</Link>
            ))}
        </div>
    );
};

export default Activelink;