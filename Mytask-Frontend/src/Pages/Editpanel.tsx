import axios from "axios";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isOpen, currentid, dailyatom, parentid } from "../Atoms/Atoms";
import { DATABASE_URL } from "../config";
import { Sidebar } from "@/Components/Sidebar"
import ShaderNodeFlow from "./TaskStats";
export function GoalView() {
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
        <div className="h-screen w-full flex">
            <Sidebar/>
            <div className="h-full w-full">
            <ShaderNodeFlow/>
            </div>
        </div>
    );
}
 