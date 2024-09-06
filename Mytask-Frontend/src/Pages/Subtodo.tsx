import { useNavigate, useParams, } from "react-router-dom";
import { Addbutton } from "../Buttons/Addbutton";
import { Todo } from "../Components/Todo";
import { useEffect } from "react";
import axios from "axios";
import { useRecoilState, useSetRecoilState } from "recoil";
import { childatom, mainload } from "../Atoms/Atoms";
import { Appbar } from "../Components/Appbar";
import { DATABASE_URL } from "../config"
export function Subtodo(){
    const {id}=useParams();
    const navigate = useNavigate();
    const [child , setchild] = useRecoilState(childatom);
    const setload = useSetRecoilState(mainload);
    setload(false)
    useEffect(()=>{axios.post(`${DATABASE_URL}/api/v2/Todos/Child`,{
        parentId:Number(id)
    }).then(response=>{setchild(response.data.Todos);})},[id,child])
    async function dels(id:number){
      const res = await axios.put(`${DATABASE_URL}/api/v2/Delete`,{
        id:id
      })
      if(res.status===200){
        setchild(prevTodos => prevTodos.filter(todo => todo.id !== id));
      }
    }
    async function fetch(id: number, status: boolean) {
      try {
          const res = await axios.post(`${DATABASE_URL}/api/v2/Todos/Child`, { parentId: Number(id) });
          
          if (res.data.Todos.length !== 0) {
              setchild(res.data.Todos);
              navigate(`/subtodo/${id}`);
          } else {
              setchild(prevTodos => 
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
      }
  }
    return <div className="w-full h-screen bg-slate-900">
      <Appbar/>
        <div className="mt-7 grid grid-cols-2 px-2 gap-2 sm:grid-cols-2 sm:gap-2 sm:grid-rows-2 lg:grid-cols-5 lg:gap-2">
        {child.map((task) => (
            <Todo
          key={task.id}
          name={task.name}
          id={task.id}
          status={task.status}
          fn={() => fetch(task.id,task.status)}
          del={()=>{dels(task.id)}}
        />
      ))}
      <Addbutton parentId={Number(id)}/>
        </div>
    </div>
}