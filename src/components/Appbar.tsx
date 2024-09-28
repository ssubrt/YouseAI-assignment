"use client"
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';








const Appbar = ({ name }: { name: string }) => {

  const router = useRouter();

 

  const logout = async () => {
    try {

      await axios.get("/api/users/logout")
      toast.success("Logout Succesfully");
      router.push('/signin')

    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message)

    }


  }



  return (
    <div className='border-b flex justify-between px-10 py-4 mb-4 '>
      <Link href={'/kanban'} className='flex flex-col justify-center cursor-pointer font-bold italic'>

        Kanban Board

      </Link>

      <div>

      <Link href={"/tasks"} >
        <div className="relative inline-flex items-center justify-center w-9 h-8  mr-4 overflow-hidden cursor-pointer bg-gray-100 rounded-full dark:bg-gray-600">
          <span className="text-xl font-extralight text-gray-600 dark:text-gray-300">{name[0]}</span>
        </div>
        </Link>

        
          <button onClick={logout} type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full 
                   text-sm px-5 py-2.5 text-center me-2 mb-2">
            Logout
          </button>
       


       
      </div>

    

    </div>

  )
}

export default Appbar