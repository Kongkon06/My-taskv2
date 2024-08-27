import { useNavigate } from "react-router-dom"
import { Addbutton } from "../Buttons/Addbutton"
import { Appbar } from "../Components/Appbar"
import { Todo } from "../Components/Todo"
import { useEffect } from "react"
import axios from "axios"
import { useRecoilState } from "recoil"
import { childatom, todoatom } from "../Atoms/Atoms"
export const Todos = ()=>{
    const navigate = useNavigate();
    const [todo,settodo]= useRecoilState(todoatom);
    const [child , setchild] = useRecoilState(childatom);
    useEffect(()=>{
        axios.get('http://localhost:8787/api/v2/Todos/Parent').then(response=>{
            settodo(response.data.Todos);
            console.log(response.data.Todos);
        })
    },[todoatom]);
    async function dels(id:number){
        const res = await axios.put('http://localhost:8787/api/v2/Delete',{
          id:id
        })
        if(res.status===200){
          settodo(prevTodos => prevTodos.filter(todo => todo.id !== id));
        }
      }
      async function fetch(id: number, status: boolean) {
        try {
            const res = await axios.post('http://localhost:8787/api/v2/Todos/Child', { parentId: Number(id) });
            
            if (res.data.Todos.length !== 0) {
                setchild(res.data.Todos);
                console.log(child);
                navigate(`/subtodo/${id}`);
            } else {
                settodo(prevTodos => 
                    prevTodos.map(t => 
                        t.id === id ? { ...t, status: !t.status } : t
                    )
                );
                
                const updateRes = await axios.post('http://localhost:8787/api/v2/Todo/update', {
                    id: Number(id), status: !status
                });
                console.log("update :" + updateRes);
            }
        } catch (error) {
            console.error("There was an error updating the todo!", error);
        }
    }
    
    return <div className="w-full h-screen bg-slate-900">
        <Appbar/>
        <div className="grid grid-cols-2 px-2 gap-2 sm:grid-cols-2 sm:gap-2 sm:grid-rows-2 lg:grid-cols-5 lg:gap-2">
            {todo.map((task) => (
        <Todo
          key={task.id}
          name={task.name}
          id={task.id}
          status={task.status}
          fn={() => {fetch(task.id,task.status)}}
          del={() => {dels(task.id)}}
        />
      ))}
            <div className="flex justify-center"> <Addbutton parentId={0}/></div>
        </div>
    </div>
}