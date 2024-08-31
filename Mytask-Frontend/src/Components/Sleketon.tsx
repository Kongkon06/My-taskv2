import { Appbar } from "./Appbar";

export function Skeleton() {
    return (
        <div className="w-full h-screen bg-slate-900">
            <Appbar />
            <div className="mt-7 grid grid-cols-2 px-2 gap-2 sm:grid-cols-2 sm:gap-2 sm:grid-rows-2 lg:grid-cols-5 lg:gap-2">
                <div className="animate-pulse flex justify-center items-center bg-indigo-800 font-dm-sans rounded-md font-semibold p-2 w-full mobile:h-auto lg:h-48 lg:text-2xl">
                    <Dots />
                </div>
                <div className="animate-pulse flex justify-center items-center bg-indigo-800 font-dm-sans rounded-md font-semibold p-2 w-full mobile:h-auto lg:h-48 lg:text-2xl">
                    <Dots />
                </div>
                <div className="animate-pulse flex justify-center items-center bg-indigo-800 font-dm-sans rounded-md font-semibold p-2 w-full mobile:h-auto lg:h-48 lg:text-2xl">
                    <Dots />
                </div>
            </div>
        </div>
    );
}

function Dots() {
    return (
        <div className=" w-32 h-8 flex justify-between items-center">
            <div className="rounded-full bg-slate-400  lg:w-6 lg:h-6"></div>
            <div className="rounded-full bg-slate-400  lg:w-6 lg:h-6"></div>
            <div className="rounded-full bg-slate-400  lg:w-6 lg:h-6"></div>
        </div>
    );
}
