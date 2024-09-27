"use client"


import axios from "axios";
import React,{ ChangeEvent, useEffect } from "react";
import Link  from "next/link";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";
import { SignupInput } from "@/helpers/Typecheck";









export const Auth = ({ type }: { type: "signup" | "signin" }) => {

    const router = useRouter();
    const [buttonDisabled,setButtonDisabled] = React.useState(false);
    // const [loading,setLoading] = React.useState(false)

    const [postInputs, setPostInputs] = React.useState<SignupInput>({
        email: "",
        password: "",
        name: "",
       
        
    });

    useEffect(()=>{
        if(postInputs.email.length >0 && postInputs.password.length>0 ){
            setButtonDisabled(false);
        }
        else{
            setButtonDisabled(true);
        }


    }, [postInputs])

    async function sendRequest(){
        
        try{
            const response = await axios.post(`/api/users/${type === "signup" ? "signup" : "signin"}`, postInputs);
            console.log("Login Success" + response.data);
           
           
            toast.success("Signed Up , Welcome !!!");
            router.push("/tasks");
             
        }
        catch(error){
            console.log("Invalid Credentials" + error);
            toast.error("Error Signing Up")
            
        }


    }

    return (

        <div className=' h-screen flex justify-center flex-col'>
           
            <div className="flex justify-center">
                <div>
                    <div className="px-10">
                        <div className="text-3xl font-extrabold">
                            Create an Account
                        </div>

                        <div className="text-slate-400">
                           { type === "signin" ? "Don't Have an account? " :  "Already have an account? " }
                            <Link className="pl-2 underline  " href={type === "signin" ? "/signup" : "/signin"}>
                            {type === "signin" ? "Sign up" : "Sign in"}</Link>
                        </div>
                        {/* <div className="flex justify-center mt-4">
                        <div className="text-slate-400">
                            {type === "signup"  ? "Signup" : "Signin"}
                        </div>
                        </div> */}
                       

                    </div>

                    <div className="pt-6" >

                        {type ==="signup" ? <LabelledInput label="Name" placeholder="Subrat..." onChange={(e) => {
                            setPostInputs(({
                                ...postInputs,
                                name: e.target.value
                            })

                            )
                        }} /> : null}

                        <LabelledInput label="Email" placeholder="subrat@gmail.com" onChange={(e) => {
                            setPostInputs(({
                                ...postInputs,
                                email: e.target.value
                            })

                            )
                        }} />

                        <LabelledInput label="Password" type="password" placeholder="1235." onChange={(e) => {
                            setPostInputs(({
                                ...postInputs,
                                password: e.target.value
                            })

                            )
                        }} />

                        <button type="button" onClick={sendRequest} className="w-full mt-8 text-white bg-gray-800 hover:bg-gray-900 
                        focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg 
                        text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700
                         dark:focus:ring-gray-700 dark:border-gray-700">{type==="signup" ? (buttonDisabled ? "No Signup" : "Sign up") : "Sign In"}</button>




                    </div>


                </div>


            </div>
        </div>
    )
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string; // For password type input
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return <div>
        <label
            className="block mb-2 text-sm font-bold text-gray-900 dark:text-white pt-4">{label}</label>

        <input onChange={onChange} type={type || "text"} id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
          rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
           dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={placeholder} required />

    </div>
}