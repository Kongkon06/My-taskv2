import { useState } from "react";
import { useRecoilState } from "recoil";
import { currentid, isOpen } from "../Atoms/Atoms";
import { Info } from "../Pages/Info"; 
import { Editpanel } from "../Pages/Editpanel";

export function Threedots({ parentId }: { parentId?: number }) {
    const [isMultiDropdownOpen, setIsMultiDropdownOpen] = useState(false);
    const [isDoubleDropdownOpen, setIsDoubleDropdownOpen] = useRecoilState(isOpen('Editpanel'));
    const [ eso ,set] =  useRecoilState(isOpen('Addbutton'))
    const [curr, setCurr] = useRecoilState(currentid);
    console.log(parentId);
  
    const toggleMultiDropdown = () => {
        setIsMultiDropdownOpen(!isMultiDropdownOpen);
      };
    
      const toggleDoubleDropdown = () => {
        setIsDoubleDropdownOpen(!isDoubleDropdownOpen);
      };
    
      const toggleeso = () => {
        set(!eso);
        setCurr(parentId || 0);
      };

    return (
        <div className="relative inline-block text-left font-dm-sans font-semibold">
          <button
            id="multiLevelDropdownButton"
            onClick={toggleMultiDropdown}
            className="w-auto h-auto text-white focus:outline-none font-medium rounded-lg text-sm text-center inline-flex items-center"
            type="button"
            aria-hidden="true"
          >
           <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="size-6"
                >
                    <path d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                </svg>
          </button>
    
          {isMultiDropdownOpen && (
            <div
              id="multi-dropdown"
              className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44  absolute mt-2"
            >
              <ul aria-labelledby="multiLevelDropdownButton">
                <li>
                <button
                    id="doubleDropdownButton"
                    onClick={toggleeso}
                    type="button"
                    aria-hidden="true"
                    className="flex items-center justify-between w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Add a task
                  </button>
    
                  {eso && <div className="fixed inset-0 z-20 flex justify-center items-center">
                        <Info />
                    </div>}
                </li>
                <li>
                  <button
                    id="doubleDropdownButton"
                    onClick={toggleDoubleDropdown}
                    type="button"
                    aria-hidden="true"
                    className="flex items-center justify-between w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Edit
                  </button>
    
                  {isDoubleDropdownOpen && <div className="fixed inset-0 z-20 flex justify-center items-center">
                        <Editpanel id={1} />
                    </div>}
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Done
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      );
}
