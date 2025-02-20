import { Sidebar } from "@/Components/Sidebar"
import TaskPlanner from "../Components/TaskPlanner";
export function PlanView() {// Get the current ID from Recoil

    

    return (
        <div className="h-screen w-full flex">
            <Sidebar/>
            <div className="h-full w-full">
            <TaskPlanner/>
            </div>
        </div>
    );
}
 