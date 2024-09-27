"use client"


import { Auth } from "@/components/Auth";
// import Quote from "@/components/Quote";






export default function SignUpPage(){
    return (
        <div className="h-screen flex justify-center items-center">
           
                
        <Auth type="signup" />
   
      
    {/* <div className='hidden lg:block'>
      <Quote />

    </div> */}

</div>
    )




    //(
    //     <div>
    //         <div className='grid grid-cols-1 lg:grid-cols-2'>
    //             <div>
    //                 <Auth type="signup" />
    //             </div>
    
    //             <div className='hidden lg:block'>
    //               <Quote />
    
    //             </div>
    //         </div>
    //     </div>
    //   )




}