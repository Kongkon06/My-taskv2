import { useRecoilValue } from "recoil";
import { Appbar } from "../Components/Appbar";
import { childatom, todoatom } from "../Atoms/Atoms";
import { Todo } from "../Components/Todo";

export function Completed() {
  const todo = useRecoilValue(todoatom);
  const child = useRecoilValue(childatom);
    const com = todo.filter((task) => task.status === true);
  return (
    <div className="bg-indigo-950">
      <Appbar />
      <div className="bg-indigo-950 h-screen p-4 font-dm-sans">
        
        <div className="mobile:text-md lg:text-4xl text-white">Parents:</div>
        <div>
            {com.length === 0? <div className=" lg:text-3xl font-italic text-red-700 p-3">Null</div> : <div className="grid grid-cols-2 px-2 gap-2 sm:grid-cols-2 sm:gap-2 sm:grid-rows-2 lg:grid-cols-5 lg:gap-2">{
             com.map((task) => (
                <Todo
                  key={task.id}
                  name={task.name}
                  id={task.id}
                  status={task.status}
                  fn={() => {}}
                  del={() => {}}
                />
              ))}</div>}
        </div>
        <div className="mobile:text-md lg:text-4xl text-white  pb-3">Children/Single-tasks:</div>
        <div className="grid grid-cols-2 px-2 gap-2 sm:grid-cols-2 sm:gap-2 sm:grid-rows-2 lg:grid-cols-5 lg:gap-2">
          {child.map((task) => task.status && (
            <Todo
              key={task.id}
              name={task.name}
              id={task.id}
              status={task.status}
              fn={() => {}}
              del={() => {}}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
