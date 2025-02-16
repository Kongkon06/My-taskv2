import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';

export const Home = () => {
  // Simulated data for demonstration
  const todo = [
    { id: 1, name: "Complete project", status: false },
    { id: 2, name: "Review code", status: true },
    { id: 3, name: "Write documentation", status: false }
  ];

  const fetch = (id: number, status: boolean) => console.log('fetch', id, status);
  const dels = (id: number) => console.log('delete', id);

  return (
    <div className="w-full min-h-screen bg-black p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {todo.map((task) => (
          <Todo
            key={task.id}
            name={task.name}
            id={task.id}
            status={task.status}
            fn={() => fetch(task.id, task.status)}
            del={() => dels(task.id)}
          />
        ))}
        <div className="flex justify-center items-center h-full">
          <button className="w-full h-48 border border-white/20 rounded-lg hover:bg-white/5 transition-colors duration-200 text-white flex items-center justify-center">
            <span className="text-3xl">+</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const Todo = ({ id, name, fn, status, del }: {
  id: number;
  name: string;
  fn: () => void;
  status: boolean;
  del: () => void;
}) => {
  const [isCom, setIsCom] = useState(status);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setIsCom(status);
  }, [status]);

  return (
    <div
      className={`${
        isCom ? 'bg-white text-black' : 'bg-black text-white'
      } border border-white/20 rounded-lg p-4 h-48 transition-all duration-200 hover:border-white/40`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={del}
            className={`p-2 rounded-full transition-colors duration-200 ${
              isHovered ? (isCom ? 'hover:bg-black/10' : 'hover:bg-white/10') : ''
            }`}
          >
            ×
          </button>
          <div className="flex gap-1">
            <span className="w-1 h-1 rounded-full bg-current" />
            <span className="w-1 h-1 rounded-full bg-current" />
            <span className="w-1 h-1 rounded-full bg-current" />
          </div>
        </div>
        
        <div className="flex-1 flex items-center justify-center">
          <button
            onClick={() => {
              setIsCom(!isCom);
              fn();
            }}
            className="text-xl font-medium text-center hover:opacity-80 transition-opacity duration-200"
          >
            {name}
          </button>
        </div>
      </div>
    </div>
  );
};