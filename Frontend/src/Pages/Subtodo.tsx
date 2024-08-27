import { useNavigate, useParams, } from "react-router-dom";
import { Addbutton } from "../Components/Addbutton";
import { Todo } from "../Components/Todo";
import { useEffect } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { childatom } from "../Atoms/Atoms";

export function Subtodo(){
    const {id}=useParams();
    const navigate = useNavigate();
    const [child , setchild] = useRecoilState(childatom);
    useEffect(()=>{axios.post('http://localhost:8787/api/v2/Todos/Child',{
        parentId:Number(id)
    }).then(response=>{setchild(response.data.Todos);console.log("sdubto:"+child);})},[id])
    async function dels(id:number){
      const res = await axios.put('http://localhost:8787/api/v2/Delete',{
        id:id
      })
      if(res.status===200){
        setchild(prevTodos => prevTodos.filter(todo => todo.id !== id));
      }
    }
    async function fetch(id:number){
      const res = await axios.post('http://localhost:8787/api/v2/Todos/Child',{
        parentId:Number(id)
    })
    if(res.data.Todos.length !== 0){
      setchild(res.data.Todos);
      navigate(`/subtodo/${id}`);
    } else {
      setchild(prevTodos => 
        prevTodos.map(t => 
          t.id === id ? { ...t, status: !t.status } : t
        )
      );
      console.log(child);
    }
    }
    return <div>
        <div className="mt-7 grid grid-cols-2 px-2 gap-2 sm:grid-cols-2 sm:gap-2 sm:grid-rows-2 lg:grid-cols-5 lg:gap-2">
        {child.map((task) => (
            <Todo
          key={task.id}
          name={task.name}
          id={task.id}
          status={task.status}
          fn={() => fetch(task.id)}
          del={()=>{dels(task.id)}}
        />
      ))}
      <Addbutton parentId={Number(id)}/>
        </div>
    </div>
}