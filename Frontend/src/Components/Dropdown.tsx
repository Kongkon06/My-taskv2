import { useRecoilState } from "recoil";
import { currentid, editpan, isOpen } from "../Atoms/Atoms";
import { Info } from "../Pages/Info";
import { useState } from "react";
import { Editpanel } from "../Pages/Editpanel";

export function Dropdown() {
    const [Open, setIsOpen] = useRecoilState(isOpen);
    const [edit, setedit] = useRecoilState(editpan);
    const [curr] = useRecoilState(currentid); // Ensuring `currentid` is correctly updated
    console.log("outside "+edit);
    const handleAddTask = () => {
        setIsOpen(!Open);
        console.log("inside open");
    };
    const handleedit = () => {
        setedit(!edit);
        console.log(edit);
    };
    return (
        <div>
            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                    <a
                        role="button"
                        onClick={handleAddTask}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                        Add a task
                    </a>
                    <button onClick={handleAddTask}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                        Done
                    </button>
                    

                    <div
                        role="button"
                        onClick={handleedit}
                        aria-expanded={edit}
                        aria-haspopup="true"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                        Edit
                    </div>
                    {Open && (
                <div className="fixed inset-0 z-20 flex justify-center items-center">
                    <Info parentId={curr}/> {/* Passing `curr` as `parentId` */}
                </div>
                      )}
                    {edit && (
                <div className="fixed inset-0 z-20 flex justify-center items-center">
                    <Editpanel id={curr}/> {/* Passing `curr` as `parentId` */}
                </div>
                      )}
                </div>
            </div>
        </div>
    );
}
