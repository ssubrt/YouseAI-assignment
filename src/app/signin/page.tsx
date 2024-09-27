"use client"
import { Auth } from "@/components/Auth";
// import Quote from "@/components/Quote";





export default function LoginPage(){
    return (
        <div className="h-screen flex justify-center items-center">
           
              
                    <Auth type="signin" />
               
                  
                {/* <div className='hidden lg:block'>
                  <Quote />
    
                </div> */}
            
        </div>
    )
}








// import { Auth } from "@/components/Auth";
// import Quote from "@/components/Quote";






// export default function LoginPage(){

//     return (
//         <div>
//             <div className='grid grid-cols-1 lg:grid-cols-2'>
//                 <div>
//                     <Auth type="signin" />
//                 </div>
// {/*     
//                 <div className='hidden lg:block'>
//                   <Quote />
    
//                 </div> */}
//             </div>
//         </div>
//       )




// }