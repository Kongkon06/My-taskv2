import axios from "axios";
import { useState, useEffect } from "react";
import { useRecoilState,useRecoilValue,useSetRecoilState } from "recoil";
import { todoatom, isOpen, currentid, childatom, parentid } from "../Atoms/Atoms";
import { DATABASE_URL } from "../config";
export function Info({ parentId }: { parentId?: number }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const  setTodo = useSetRecoilState(todoatom);
    const  setchild = useSetRecoilState(childatom);
    const setIsOpen = useSetRecoilState(isOpen('Addbutton'));
    const [currentId,setcurent] = useRecoilState(currentid); // Get the current ID from Recoil
    const user = useRecoilValue(parentid);
    const resolvedParentId = parentId !== undefined ? parentId : currentId;

    useEffect(() => {
        console.log("Inside Info resolvedParentId:", resolvedParentId); // Log to ensure resolvedParentId is correct
    }, [resolvedParentId]);

    async function Add() {
        if (!name || !description) {
            alert("Please fill in both name and description.");
            return;
        }
    
        try {
            console.log(user);
            const res = await axios.post(`${DATABASE_URL}/api/v2/Todo`, {
                name: name,
                description: description,
                userId: user,
                parentId: resolvedParentId===0?null:resolvedParentId // Use resolvedParentId here
            });
            console.log("Response from server:", res);
    
            // Check if parentId is undefined before updating the todo state
            if (resolvedParentId === 0) {
                setTodo(prevTodos => [...prevTodos, res.data]);
            }else{
                setchild(prevTodos => [...prevTodos, res.data]);
            }
    
            setIsOpen(false);
        } catch (error) {
            console.error("Error adding task:", error);
            alert("There was an error adding the task. Please try again.");
        }
    }
    

    return (
        <div className="relative w-screen h-screen flex justify-center items-center">
            <div className="absolute inset-0 bg-gray-800 opacity-50 z-10"></div> {/* Blurred background overlay */}
            <div className="relative z-20 w-11/12 sm:w-3/5 md:w-2/5 lg:w-1/5 h-auto pb-2 rounded-md bg-white shadow-xl">
                <div className="font-semibold font-dm-sans p-4">
                    <label className="block mb-2 text-gray-700">Name</label>
                    <input
                        className="border border-slate-900 text-slate-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none dark:text-white dark:bg-slate-900 dark:placeholder-slate-200 focus:text-black focus:bg-slate-200"
                        placeholder="Gym"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <label className="block my-2 text-gray-700">Description</label>
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
