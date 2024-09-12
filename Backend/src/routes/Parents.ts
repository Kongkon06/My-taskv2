import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
export const Todos = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>();

Todos.post('/Parent',async (c) => {
    const body =await c.req.json()
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());
        const Todos =await prisma.todo.findMany({
            where:{
                userId:body.id,
                parentId:null
            },
            include:{
                subTodos:{
                    select:{
                        name:true
                    }
                }
            }
        });
        return c.json({Todos});
    } catch (e) {
        console.log(e);
        return c.json({});
    }
})
Todos.post('/Child',async (c) => {
    const body =await c.req.json();
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());
        const Todos =await prisma.todo.findMany({
           where:{
            parentId:body.parentId
           },include:{
            subTodos:{
                select:{
                    name:true
                }
            }
           }
        })
        return c.json({Todos});
    }catch(e){
        c.status(411);
        console.log(e);
        return c.json({msg:e});
    }
})

