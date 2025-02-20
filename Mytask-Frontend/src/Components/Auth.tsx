import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DATABASE_URL } from "../config";
import { ChangeEvent, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../Atoms/Atoms";

// Firebase Config (Replace with your actual Firebase config)
const firebaseConfig = {
  apiKey: "AIzaSyCJeJsp9G5hnzzyNA-DC29f432u4MqFl00",
  authDomain: "my-taskv2.firebaseapp.com",
  projectId: "my-taskv2",
  storageBucket: "my-taskv2.firebasestorage.app",
  messagingSenderId: "494955149889",
  appId: "1:494955149889:web:8a3710272e3ce3ab65e4c0",
  measurementId: "G-S0G2QKN50D"
};

const GradientCard = ()=> (<svg 
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
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

interface SignupInput {
  email?: string;
  username: string;
  password: string;
}

export function Auth({ type }: { type: "signup" | "signin" }) {
  const navigate = useNavigate();
  const setid = useSetRecoilState(userAtom);
  const [postInputs, setpostInputs] = useState<SignupInput>({
    email: "",
    password: "",
    username: "",
  });
  
  // Track if Google sign-in has been triggered
  const [triggerRequest, setTriggerRequest] = useState(false);
  
  async function SendReq() {
    try {
      const res = await axios.post(
        `${DATABASE_URL}/api/v2/User${type === "signup" ? "" : "/signin"}`,
        postInputs
      );
      setid(res.data.id);
      navigate("/dashboard");
    } catch (e) {
      alert("Error while signing in");
      console.log(e);
    }
  }
  
  async function handleGoogleSignIn() {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      console.log("Google User:", user);
      console.log(user.email);
  
      setpostInputs({
        email: user.email?.toString() ?? "",
        password: user.uid.toString() ?? "",
        username: user.displayName?.toString() ?? "",
      });
  
      // Set trigger to send request
      if (type === "signup") setTriggerRequest(true);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  }
  
  // Use useEffect to send the request **after** postInputs is updated
  useEffect(() => {
    if (triggerRequest) {
      SendReq();
      setTriggerRequest(false); // Reset trigger
    }
  }, [postInputs]); // Runs when postInputs changes
  
  


  return (
    <div className="relative h-screen font-dm-sans text-white bg-slate-900 flex justify-center">
      <div className="absolute inset-0 overflow-hidden">
        <GradientCard/>
      </div>
      <div className="relative flex justify-center flex-col p-2 h-auto sm:w-auto lg:w-2/6">
      <div className="text-red-600 sm:text-lg font-kubo lg:text-2xl">*The App is still in Developement Phase and Soon be notified*</div>
        <div className="flex justify-center font-extrabold mb-3 sm:text-xl font-kubo lg:text-3xl">
          {type === "signup" ? "Create an account" : "Sign in"}
        </div>
        <div className="flex justify-center mb-3">
          <div>{type === "signup" ? "Already have an account?" : "Don't have an account?"}</div>
          <div
            role="button"
            onClick={() => navigate(type === "signup" ? "/Signin" : "/Signup")}
            className="underline cursor-pointer"
          >
            {type === "signup" ? "Login" : "Sign up"}
          </div>
        </div>

        {type === "signup" && (
          <LabelledInput
            labell="Email"
            placeholder="user12@email"
            onchange={(e) => setpostInputs((c) => ({ ...c, email: e.target.value }))}
          />
        )}
        <LabelledInput
          labell="Username"
          placeholder="Enter username"
          onchange={(e) => setpostInputs((c) => ({ ...c, username: e.target.value }))}
        />
        <LabelledInput
          labell="Password"
          type="password"
          placeholder=""
          onchange={(e) => setpostInputs((c) => ({ ...c, password: e.target.value }))}
        />

        <button
          type="button"
          onClick={SendReq}
          className="w-full mt-4 text-white font-bold bg-indigo-700 hover:bg-indigo-600 rounded-lg px-5 py-2.5"
        >
          {type === "signup" ? "Sign up" : "Sign in"}
        </button>

        <div className="flex justify-center mt-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center bg-white text-black px-5 py-2.5 rounded-lg shadow-md hover:bg-gray-100"
          >
            <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google" className="mr-2" />
            {type === "signup" ? "Sign up with Google" : "Sign in with Google"}
          </button>
        </div>

      </div>
    </div>
  );
}

interface LabelledInputType {
  labell: string;
  placeholder: string;
  onchange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({ labell, placeholder, onchange, type }: LabelledInputType) {
  return (
    <div className="w-full font-dm-sans mb-3">
      <div className="w-64 pr-3 flex justify-start sm:text-lg lg:text-2xl font-bold mb-3">{labell}</div>
      <input
        type={type || "text"}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-12 p-2.5 dark:bg-slate-950 dark:border-gray-600 dark:text-white focus:bg-white focus:text-black"
        placeholder={placeholder}
        onChange={onchange}
      />
    </div>
  );
}
