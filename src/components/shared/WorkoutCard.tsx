import { Iworkout } from '@/types/workout.type';
import Image from 'next/image';
import Link from 'next/link';


interface IWorkoutProps{
    workout:Iworkout;
}
const WorkoutCard = ({workout}:IWorkoutProps) => {
    return (
        <Link href={`/apps/${workout.id}`}>
        <div className='border border-gray-500 bg-[#222630] pb-5 rounded-lg overflow-hidden transition-all duration-200 hover:border-amber-400 ease-out hover:-translate-y-1 hover:-shadow-xl hover:shadow-lg  '>
            <Image src={workout.image} alt="workoutImg" width={150} height={100} className=' w-full h-70' />
          <div>
           <div className='flex gap-3 py-4 px-7'>
            {workout.muscleGroups?.map((group,index)=>(
<span key={index} className='bg-[#C2F800] rounded-lg px-3  '>{group}</span>
            ))}
             </div>
        <div className='px-7'>
       <p className='text-white'>{workout.name}</p>
       <p className='text-gray-500 py-1'>{workout.equipment}</p>
      </div>
      <hr className='text-gray-500 py-2 w-7/8 mx-auto' />
      <div className='flex gap-10 px-7 text-gray-500'>
       <h4>{workout.duration}</h4>
       <h4>{workout.caloriesBurned}</h4>
       <h4>{workout.rating}</h4>
      
       </div>
      
       </div>
        
       </div>
   </Link> );
};

export default WorkoutCard;