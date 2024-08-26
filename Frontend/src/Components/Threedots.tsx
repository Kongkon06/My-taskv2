import { useState } from "react";
import { Dropdown } from "./Dropdown";
import { useRecoilState } from "recoil";
import { currentid } from "../Atoms/Atoms";

export function Threedots({ parentId }: { parentId?: number }) {
    const [isOpen, setIsOpen] = useState(false);
    const [curr, setCurr] = useRecoilState(currentid);
    console.log(parentId);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        console.log("Inside to"+parentId);
            setCurr(parentId || 0);
    };

    return (
        <div
            role="button"
            className="relative inline-block text-left"
            onClick={toggleDropdown}
            aria-expanded={isOpen}
            aria-haspopup="true"
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
            {isOpen && <Dropdown />}
        </div>
    );
}
