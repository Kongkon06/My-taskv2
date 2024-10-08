import axios from "axios";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isOpen, currentid, dailyatom, parentid } from "../Atoms/Atoms";
import { DATABASE_URL } from "../config";
export function Editpanel() {
    const [name, setName] = useState("");
    const user = useRecoilValue(parentid);
    const [description, setDescription] = useState("");
    const setdaily = useSetRecoilState(dailyatom);
    const  setIsOpen = useSetRecoilState(isOpen('Editpanel'));
    const setcurent = useSetRecoilState(currentid); // Get the current ID from Recoil

    async function Add() {
        if (!name || !description) {
            alert("Please fill in both name and description.");
            return;
        }
    
        try {
            const res = await axios.post(`${DATABASE_URL}/api/v2/Daily/create`, {
                title: name,
                description: description,
                userId:user
            });
            console.log("Response from server:", res);
    
            if (res.status === 200) {
                setdaily(prevTodos => [...prevTodos, res.data]);
            }
    
            setIsOpen(false);
        } catch (error) {
            console.error("Error adding task:", error);
            alert("There was an error adding the task. Please try again.");
        }
    }
    

    return (
        <div className="relative w-screen h-screen flex justify-center items-center">
            <div className="absolute inset-0 bg-gray-800 opacity-50 z-10 text-sm"></div> {/* Blurred background overlay */}
            <div className="relative z-20 w-11/12 sm:w-3/5 md:w-2/5 lg:w-1/5 h-auto pb-2 rounded-md bg-white shadow-xl">
                <div className="w-full pt-2 flex justify-center text-black">Edit panel</div>
                <div className="font-semibold font-dm-sans p-4">
                    <label className="block mb-2 text-gray-700 text-sm">Edit</label>
                    <input
                        className="border border-slate-900 text-slate-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none dark:text-white dark:bg-slate-900 dark:placeholder-slate-200 focus:text-black focus:bg-slate-200"
                        placeholder="Gym"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <label className="block my-2 text-gray-700 text-sm">Description</label>
                    <input
                        className="border border-slate-900 text-slate-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none dark:text-white dark:bg-slate-900 dark:placeholder-slate-200 focus:text-black focus:bg-slate-200"
                        placeholder="Go to gym.."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <div className="w-full flex justify-between">
                        <button
                            className="text-white bg-slate-900 focus:outline-none text-sm rounded-full px-5 py-2.5 text-center mt-4"
                            onClick={() => {setIsOpen(false),setcurent(0)}}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={Add}
                            className="text-white bg-slate-900 focus:outline-none text-sm rounded-full px-5 py-2.5 text-center mt-4"
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
 