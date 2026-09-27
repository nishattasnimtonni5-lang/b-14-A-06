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
        <div className="flex gap-3">
            {links.map((link)=>(
                <Link key={link.href} href={link.href} className={pathname===link.href?'text-[#C2F800] bg-[#C2F800]/10 rounded-2xl px-4 text-lg py-2  border border-gray-500 ':'text-gray-500 text-lg px-4 py-2 hover:text-[#C2F800]'} >{link.name}</Link>
            ))}
        </div>
    );
};

export default Activelink;