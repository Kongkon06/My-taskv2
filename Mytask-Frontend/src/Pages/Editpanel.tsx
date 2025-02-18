import { Sidebar } from "@/Components/Sidebar"
import ShaderNodeFlow from "./TaskStats";
export function GoalView() {// Get the current ID from Recoil

    

    return (
        <div className="h-screen w-full flex">
            <Sidebar/>
            <div className="h-full w-full">
            <ShaderNodeFlow/>
            </div>
        </div>
    );
}
 