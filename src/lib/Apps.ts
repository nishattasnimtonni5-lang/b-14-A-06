import { Iworkout } from "@/types/workout.type";

export const getAllCategory=async()=>{
const res=await fetch('https://api.api-store.workers.dev/api/fitlog');
const data=res.json()
return data;
}
export const getWorkoutDetails=async(id:string):Promise<Iworkout>=>{
  const res=await fetch(`https://api.api-store.workers.dev/api/fitlog/${id}`,{
    next:{revalidate:60}
  })
 if(!res.ok){
  throw new Error(`Failed to fetch workout details. Status:${res.status}`)
 }
  const data= await res.json();
  return data;
}
