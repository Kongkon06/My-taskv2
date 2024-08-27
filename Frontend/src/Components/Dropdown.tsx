import { useRecoilState } from "recoil";
import { currentid, isOpen } from "../Atoms/Atoms";
import { Info } from "../Pages/Info";
import { Editpanel } from "../Pages/Editpanel";

export function Dropdown() {
    const [Open, setIsOpen] = useRecoilState(isOpen('info')); // Use isOpenFamily for Dropdown state
    const [edit, setEdit] = useRecoilState(isOpen('Editpanel'));
    const [curr] = useRecoilState(currentid); // Ensuring currentid is correctly updated

    const handleAddTask = () => {
        setIsOpen(!isOpen);
    };

    const handleEdit = () => {
        setEdit(!edit);
    };

    return (
        <div className="w-full relative inline-block text-left">
    {/* Dropdown Menu */}
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
                <div>
                {Open && (
                <div className="fixed inset-0 z-20 flex justify-center items-center">
               <Info parentId={curr} /> {/* Passing curr as id */}
                </div>)}
                <a
                    role="button"
                    onClick={handleAddTask}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                    Add a task
                </a>
                </div>
                
                <div>
                {edit && (
                 <div className="fixed inset-0 z-20 flex justify-center items-center">
            <Editpanel id={curr} /> {/* Passing curr as id */}
             </div>
             )}

             <div
                    role="button"
                    onClick={handleEdit}
                    aria-expanded={edit}
                    aria-haspopup="true"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                    Edit
                </div>
                </div>
            </div>
        </div>
    {/* Render Editpanel or Info conditionally */}
    
</div>

    );
}
