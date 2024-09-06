import { useRecoilState } from "recoil";
import { isOpen } from "../Atoms/Atoms";
import { Info } from "../Pages/Info";

export function Dropdown({del}:{del: () => void}) {
  // State management for dropdown and modals
  const [isInfoOpen, setIsInfoOpen] = useRecoilState(isOpen('Addbutton'));

  // Handlers to toggle state
  const toggleInfo = () => {
    setIsInfoOpen(!isInfoOpen);
  };

  return (
    <div className="w-full relative inline-block text-left">
      {/* Dropdown Menu */}
      <div
        id="multi-dropdown"
        className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute mt-2"
      >
        <ul aria-labelledby="multiLevelDropdownButton">
          <li>
            <button
              id="addTaskButton"
              onClick={toggleInfo}
              type="button"
              aria-hidden="true"
              className="flex items-center justify-between w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Add a task
            </button>
            {isInfoOpen && (
              <div className="fixed inset-0 z-20 flex justify-center items-center">
                <Info />
              </div>
            )}
          </li>
          <li>
          <button
              id="editButton"
              onClick={del}
              type="button"
              aria-hidden="true"
              className="flex items-center justify-between w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Delete
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
