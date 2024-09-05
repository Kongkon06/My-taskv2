import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate';
import { Todos } from "./Parents";
import { Daily } from "./Daily";
export const Todo = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>();

Todo.route('/Todos',Todos)
Todo.route('/Daily',Daily)
Todo.post('/Todo',async (c) => {
    const body =await c.req.json();
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());
        const todo =await prisma.todo.create({
           data:{
            name:body.name,
            description:body.description,
            parentId:body.parentId
        }})
        return c.json(todo)
    }catch(e){
        c.status(411);
        console.log(e);
        return c.json({msg:e});
    }
})
Todo.post('/Todo/update',async (c) => {
    
    try{
        const body=await c.req.json();
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());
        const update=await prisma.todo.update({
            where:{
                id:body.id
            },
            data:{
                status:body.status
            }
        })
        if(!update){
           return c.json({msg:"done"});
        }else{
            return c.json({msg:"Error in database",update});
        }

    }catch(e){
        return c.json({});
    }
})
Todo.put('/Delete', async (c) => {
    const body = await c.req.json();
    try{
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());
        const del =await prisma.todo.delete({
            where:{
                id:body.id
            }
        })
        if(!del){
        return c.json({msg:"deleted"})
        }else{
            return c.json({msg:"error"});
        }
    }catch(e){
        return c.json({});
    }
})