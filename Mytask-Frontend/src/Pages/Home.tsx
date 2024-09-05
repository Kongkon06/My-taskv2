import { Appbar } from "../Components/Appbar"
import { Dailypage } from "./DailyList"
import { Todos } from "./Todos"

export function Home(){
    return <div className="w-full h-screen bg-slate-900">
        <Appbar/>
        <div className="grid grid-cols-2 mobile:grid-cols-2 lg:grid-cols-6 pr-2">
            <div className="col-span-1 sm:col-span-1 lg:col-span-5">
            <Todos/>
            </div>
            <div className="col-span-1">
                <Dailypage/>
            </div>
        </div>
    </div>
}