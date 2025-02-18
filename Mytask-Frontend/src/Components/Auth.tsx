import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DATABASE_URL } from "../config";
import { ChangeEvent, useState } from "react";
import {  useSetRecoilState } from "recoil";
import { parentid } from "../Atoms/Atoms";
interface SignupInput{
        email?:string,
        username:string,
        password:string,
}
const GradientCard = () => (
  <svg 
    className="absolute -top-40 left-0 w-full" 
    style={{ 
      height: '150%',
      minHeight: '400px',
    }} 
    preserveAspectRatio="xMidYMin slice" 
    viewBox="0 0 283 290" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 20C0 8.9543 8.9543 0 20 0H151H216H249.5H263C274.046 0 283 8.95431 283 20V270C283 281.046 274.046 290 263 290H20C8.95431 290 0 281.046 0 270V20Z"
      fill="url(#paint0_linear_98_2)"
    />
    <g clipPath="url(#paint1_angular_98_2_clip_path)">
      <g transform="matrix(-0.1225 0.178 -0.178 -0.1225 122.5 112)">
        <foreignObject x="-1085.33" y="-1085.33" width="2170.67" height="2170.67">
          <div
            style={{
              background:
                "conic-gradient(from 90deg, rgba(166, 20, 44, 0.3158) 0deg, rgba(190, 22, 22, 0.2) 12.8811deg, rgba(19, 0, 127, 1) 61.2748deg, rgba(0, 0, 0, 1) 186.719deg, rgba(28, 2, 173, 1) 283.916deg, rgba(166, 20, 44, 0.3158) 360deg)",
              height: "100%",
              width: "100%",
              opacity: 1,
            }}
          />
        </foreignObject>
      </g>
    </g>
    <path
      d="M0 20C0 8.9543 8.9543 0 20 0H110.52C127.089 0 136.472 18.9917 126.405 32.1515L113.28 49.3104C100.44 66.0956 119.02 88.7324 137.986 79.4115L266 16.5C273.235 11.6055 283 16.789 283 25.5244V270C283 281.046 274.046 290 263 290H20C8.95431 290 0 281.046 0 270V20Z"
    />
    <defs>
      <clipPath id="paint1_angular_98_2_clip_path">
        <path d="M0 20C0 8.9543 8.9543 0 20 0H110.52C127.089 0 136.472 18.9917 126.405 32.1515L113.28 49.3104C100.44 66.0956 119.02 88.7324 137.986 79.4115L266 16.5V16.5C273.235 11.6055 283 16.789 283 25.5244V270C283 281.046 274.046 290 263 290H20C8.95431 290 0 281.046 0 270V20Z" />
      </clipPath>
      <linearGradient id="paint0_linear_98_2" x1="150" y1="118.5" x2="422" y2="-179" gradientUnits="userSpaceOnUse">
        <stop stopColor="#000FB9" />
        <stop offset="0.295" stopColor="#D1466D" />
        <stop offset="0.640786" stopColor="#FF0048" />
      </linearGradient>
    </defs>
  </svg>
);
export function Auth({type}:{type : "signup"| "signin"}){
    const navigate = useNavigate();
    const setid = useSetRecoilState(parentid);
    const [postInputs,setpostInputs] = useState<SignupInput>({
        email:"",
        password:"",
        username:""
    })
    async function SendReq(){
      try{
         await axios.post(`${DATABASE_URL}/api/v2/User/${type==="signup"?"":"signin"}`,postInputs).then(res=>{setid(res.data.id);});
        navigate("/");
      }catch(e){
        alert("Error while signing in")
        console.log(e);
      }
    }
    return <div className="relative h-screen font-dm-sans text-white bg-slate-900 flex justify-center">
        <div className="absolute inset-0 overflow-hidden">
        <GradientCard/>
        </div>       
        <div className="relative flex justify-center flex-col p-2 h-auto sm:w-auto lg:w-2/6">
        <div className="flex justify-center font-extrabold mb-3 sm:text-xl font-kubo lg:text-3xl">Create an account</div>
        <div className="flex justify-center mb-3">
            <div>{type==="signup"?"Already hava an account?":"Don't have an account?"}</div>
            <div role="button" onClick={()=>{navigate(type==="signup"?"/Signin":"/Signup")}} className="underline hover:underline-offset-auto">{type==="signup"?"Login":"Sign up"}</div>
        </div>
        <div>
       {type=="signup"?<LabelledInput labell="Email" placeholder="user12@email" onchange={(e)=>{setpostInputs(c=>({...c,email:e.target.value}))}}/> : null}
        
        <LabelledInput labell="Username" placeholder="Enter username" onchange={(e)=>{setpostInputs(c=>({...c,username:e.target.value}))}}/>
        
        <LabelledInput labell="Password" type="password" placeholder="" onchange={(e)=>{setpostInputs(c=>({...c,password:e.target.value}))}}/>

        <button type="button" onClick={SendReq} className=" w-full mt-9 text-white font-bold bg-indigo-700 hover:bg-indigo-600 rounded-lg sm:text-md lg:text-2xl px-5 py-2.5 me-2 mb-2 dark:bg-indigo-700 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-700">{type === "signup"?"Sign up": "Sign in"}</button>
        </div></div>
    </div>
}
interface LabelledInputtype{
 labell:string,
 placeholder:string,
 onchange:(e:ChangeEvent<HTMLInputElement>)=>void,
 type?:string
}
function LabelledInput({labell,placeholder,onchange,type}:LabelledInputtype){
    return <div className="w-full font-dm-sans mb-3">
   <div className=" w-64 pr-3 flex justify-start sm:text-lg lg:text-2xl font-bold mb-3 ">{labell}</div>
    <div className="">
      <input
        type={type||"text"}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-12 ps-10 p-2.5 dark:bg-slate-950 dark:border-gray-600 dark:placeholder-slate-200 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:bg-white focus:text-black"
        placeholder={placeholder} onChange={onchange}
      />
    </div>
  </div>
}