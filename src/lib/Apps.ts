import { Iworkout } from "@/types/workout.type";

export const getAllCategory=async()=>{
const res=await fetch('https://api.abcz.workers.dev/api/fitlog');
const data=res.json()
return data;
}
export const getWorkoutDetails=async(id:string):Promise<Iworkout>=>{
  const res=await fetch(` https://api.abcz.workers.dev/api/fitlog/${id}`)
  const data= await res.json();
  return data;
}
