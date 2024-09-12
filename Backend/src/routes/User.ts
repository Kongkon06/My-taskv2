import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from "hono/jwt";
import { getCookie, setCookie } from "hono/cookie";
export const User = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>();
User.post('/User',async (c) => {
    const body =await c.req.json();
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());
        const User =await prisma.user.create({
            data: {
                email: body.email,  
                password: body.password,     
                username: body.username,            
              },})
        const token =await sign({username:body.username},c.env.JWT_SECRET);
          
        return c.json(token);
    }catch(e){
        c.status(411);
        console.log(e);
        return c.json({msg:e});
    }
})
User.post('/User/signin',async (c) => {
    const body =await c.req.json();
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());
        getCookie(c,"token");
        const User =await prisma.user.findFirst({
            where: { 
                password: body.password,     
                username: body.username,            
              },})
        if(!User){
            c.status(411);
            return c.json({msg:"not logged in"})
        }
        const token =await sign({username:body.username},c.env.JWT_SECRET);
        return c.json(User);
    }catch(e){
        c.status(411);
        console.log(e);
        return c.json({msg:e});
    }
})
User.put('/Delete', async (c) => {
    const body = await c.req.json();
    try{
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());
        const del =await prisma.user.delete({
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
