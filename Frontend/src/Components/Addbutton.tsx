import { Info } from "../Pages/Info";
import { useRecoilState } from "recoil";
import { currentid, isOpen } from "../Atoms/Atoms";

export function Addbutton({parentId}:{parentId?:number}) {
    const [Open, setIsOpen] = useRecoilState(isOpen('Addbutton'));
    const [curr,setCurr] = useRecoilState(currentid);
    console.log("inside add")
    const toggleDropdown = () => {
        setIsOpen(!Open);
        setCurr(parentId || 0);
    };

    return (
        <div className="w-full relative inline-block text-left">
            {/* Overlay for blurring the background */}
            {Open && (
                <div className="fixed inset-0 z-10 backdrop-blur-sm bg-black bg-opacity-0" onClick={toggleDropdown}></div>
            )}

            <div
                role={'button'}
                className={`z-20 flex justify-center items-center shadow-lg shadow-slate-700 bg-indigo-950 font-dm-sans rounded-md font-semibold text-white p-2 w-full mobile:h-full mobile:text-sm lg:h-48 lg:text-2xl`}
                onClick={toggleDropdown}
                aria-expanded={Open}
                aria-haspopup="true"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="size-6 sm:size-10">
                    <path d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </div>

            {Open && (
                <div className="fixed inset-0 z-20 flex justify-center items-center">
                    <Info />
                </div>
            )}
        </div>
    );
}
