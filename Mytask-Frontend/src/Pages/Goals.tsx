import { parentid, todoatom } from '@/Atoms/Atoms';
import Sidebar from '@/Components/Sidebar';
import { DATABASE_URL } from '@/config';
import axios from 'axios';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Todo } from '@/Components/Todo';
import { useNavigate } from 'react-router-dom';
import { Appbar } from '@/Components/Appbar';

export const GoalsList = () => {
  const userid = useRecoilValue(parentid);
  const [todo,settodo] = useRecoilState(todoatom);
  const setParentid = useSetRecoilState(parentid);
  const navigte = useNavigate();
  useEffect(()=>{
    axios.post(`${DATABASE_URL}/api/v2/Todos/Parent`,{
        userId:userid
    }).then(response=>{
        settodo(response.data.Todos);
        console.log(response.data.Todos);
    })
  },[todoatom,userid]);

  const fetch = (name:string,id: number, status: boolean) => {
    todo.map((task:any)=>{
      if(task.subTodos.length!=0){
        setParentid(id);
        navigte(`/plans/${name}`);
      }
    })
    console.log('fetch', id, status)};

  return (
    <div className="w-full min-h-screen flex bg-black">
      <Sidebar />
      <main className="flex-1 px-6">
        <Appbar/>
        <div className="mt-16 pt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {todo.map((task) => (
            <Todo
              key={task.id}
              name={task.name}
              id={task.id}
              status={task.status}
              fn={() => fetch(task.name,task.id, task.status)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};
