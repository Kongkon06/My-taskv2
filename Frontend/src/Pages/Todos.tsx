import { useNavigate } from "react-router-dom"
import { Addbutton } from "../Components/Addbutton"
import { Appbar } from "../Components/Appbar"
import { Todo } from "../Components/Todo"
import { useEffect } from "react"
import axios from "axios"
import { useRecoilState } from "recoil"
import { todoatom } from "../Atoms/Atoms"
export const Todos = ()=>{
    const navigate = useNavigate();
    const [todo,settodo]= useRecoilState(todoatom);
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
      }
    return <div className="">
        <Appbar/>
        <div className="grid grid-cols-2 px-2 gap-2 sm:grid-cols-2 sm:gap-2 sm:grid-rows-2 lg:grid-cols-5 lg:gap-2">
            {todo.map((task) => (
        <Todo
          key={task.id}
          name={task.name}
          id={task.id}
          stat={false}
          fn={() => navigate(`/subtodo/${task.id}`)}
          del={() => {dels(task.id)}}
        />
      ))}
            <div className="flex justify-center"> <Addbutton/></div>
        </div>
    </div>
}