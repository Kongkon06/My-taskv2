import { useNavigate } from "react-router-dom"
import { Addbutton } from "../Buttons/Addbutton"
import { Todo } from "../Components/Todo"
import { useEffect } from "react"
import axios from "axios"
import { useRecoilState, useSetRecoilState } from "recoil"
import { childatom, mainload, todoatom } from "../Atoms/Atoms"
import { DATABASE_URL } from "../config"
import { Skeleton } from "../Components/Sleketon"
export const Todos = ()=>{
    const navigate = useNavigate();
    const [todo,settodo]= useRecoilState(todoatom);
    const  setchild = useSetRecoilState(childatom);
    const [loading,setload] = useRecoilState(mainload);
    useEffect(()=>{
        axios.get(`${DATABASE_URL}/api/v2/Todos/Parent`).then(response=>{
            settodo(response.data.Todos);
            setload(false)
        })
    },[todoatom]);
    if(loading){
        return <div>
            <Skeleton/>
        </div>
    }
    async function dels(id:number){
        const res = await axios.put(`${DATABASE_URL}/api/v2/Delete`,{
          id:id
        })
        if(res.status===200){
          settodo(prevTodos => prevTodos.filter(todo => todo.id !== id));
        }
      }
      async function fetch(id: number, status: boolean) {
        setload(true);
        try {
            const res = await axios.post(`${DATABASE_URL}/api/v2/Todos/Child`, { parentId: Number(id) });
            
            if (res.data.Todos.length !== 0) {
                setchild(res.data.Todos);
                navigate(`/subtodo/${id}`);
            } else {
                settodo(prevTodos => 
                    prevTodos.map(t => 
                        t.id === id ? { ...t, status: !t.status } : t
                    )
                );
                
                await axios.post(`${DATABASE_URL}/api/v2/Todo/update`, {
                    id: Number(id), status: !status
                });
            }
        } catch (error) {
            console.error("There was an error updating the todo!", error);
        }finally{
            setload(false);
        }
    }
    
    return <div className="w-full h-full bg-slate-900">
        <div className="grid grid-cols-1 px-2 gap-2 sm:grid-cols-1 sm:gap-2 lg:grid-cols-5 lg:gap-2">
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