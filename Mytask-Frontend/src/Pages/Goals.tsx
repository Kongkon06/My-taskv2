import { todoatom } from '@/Atoms/Atoms';
import Sidebar from '@/Components/Sidebar';
import { useRecoilValue } from 'recoil';
import { Todo } from '@/Components/Todo';
import { useNavigate } from 'react-router-dom';
import { Appbar } from '@/Components/Appbar';

export const GoalsList = () => {
  const todo = useRecoilValue(todoatom);
  const navigte = useNavigate();

  const fetch = (name:string,id: number, status: boolean) => {
        navigte(`/plans/${name}`);
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
