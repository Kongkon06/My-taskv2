import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { dailyatom } from '../Atoms/Atoms';
import { Deleteicon } from '../Components/Deleteicon';
import { DATABASE_URL } from '../config';

export function Dailytask({ name, id, completions }: { name: string, id: number, completions: any[] }) {
    const setdaily = useSetRecoilState(dailyatom);
    const [isChecked, setIsChecked] = useState(false);

    const today = new Date().toISOString().split('T')[0];

    useEffect(() => {
        if (Array.isArray(completions)) {
            const todayCompletion = completions.find(completion =>
                new Date(completion.date).toISOString().split('T')[0] === today
            );
            if (todayCompletion && todayCompletion.completed) {
                setIsChecked(true);
            } else {
                setIsChecked(false);
            }
        }
    }, [completions, today]);

    function handleChange() {
        axios.post(`${DATABASE_URL}/api/v2/Daily/update`, {
            status: !isChecked,
            id: id
        }).then(() => {
            setIsChecked(!isChecked); // Update local state
        });
    }

    function del() {
        axios.put(`${DATABASE_URL}/api/v2/Daily/Delete`, {
            id: id
        }).then((res) => {
            if (res.status === 200) {
                setdaily(prevTodos => prevTodos.filter(todo => todo.id !== id));
            }
        });
    }

    return (
        <div className="flex justify-center mb-3 font-dm-sans text-lg">
            <div className="w-full h-auto flex justify-between bg-violet-700 rounded-full px-3 py-1 text-white">
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleChange} // Add onChange handler
                />
                <div>{name}</div>
                <div className="flex items-center"><Deleteicon del={del} /></div>
            </div>
        </div>
    );
}
