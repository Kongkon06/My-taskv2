import { atom,atomFamily } from 'recoil';

interface Todo {
  id: number;
  name: string;
  status: boolean;
  parentId:number;
  description: string;
}
export interface Daily{
  "id": number,
  "title": string,
  "description": string
  "dueDate": string
  "repeatDaily": boolean,
  "createdAt": string,
  "updatedAt": string,
  "completions": []
}
type Regular = Exclude<Todo ,'parentId'>;

// Initialize with an array of Todo objects
export const todoatom = atom<Regular[]>({
  key: 'todoatom',
  default: [], // default should be an empty array, not an object
});

export const childatom = atom<Todo[]>({
    key:"childatom",
    default: []
})
export const isOpen = atomFamily({
  key:"isOpen",
  default:false
})
export const editpan = atom({
  key:"editpan",
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
  
  export const mainload = atom({
    key:'mainload',
    default:true
  })
  export const dailyatom = atom<Daily[]>({
    key:'daily',
    default:[]
  })