import { atom,atomFamily } from 'recoil';

interface Todo {
  id: number;
  name: string;
  status: boolean;
  parentId:number;
  description: string;
}
type Regular = Exclude<Todo ,'parentId'>;

export const todoatom = atom<Regular[]>({
  key: 'todoatom',
  default: [], 
});

export const childatom = atom<Todo[]>({
    key:"childatom",
    default: []
})
export const isOpen = atomFamily({
  key:"isOpen",
  default:false
})

export const currentid = atom({
  key:"currentid",
  default:0
})
export const task_com = atomFamily({
    key:'task_com',
    default:false
  })
  