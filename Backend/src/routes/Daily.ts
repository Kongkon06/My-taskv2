import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate';
export const Daily = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>();

Daily.post('/',async (c) => {
    const body =await c.req.json();
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());
        const Daily =await prisma.dailytask.create({
           data:{
            title:body.title,
            description:body.description,
        }})
        return c.json(Daily)
    }catch(e){
        c.status(411);
        console.log(e);
        return c.json({msg:e});
    }
})
Daily.post('/update', async (c) => {
    try {
        const body = await c.req.json();
        const today = new Date(); 
        const startOfDay = new Date(today.setHours(0, 0, 0, 0)); 
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        const updateOrCreateCompletionForToday = await prisma.completion.upsert({
            where: {
                dailyTaskId_date: {
                    dailyTaskId: body.id,
                    date: startOfDay,
                },
            },
            update: {
                completed: body.status,
                todoId: 1,
            },
            create: {
                dailyTaskId: body.id,
                date: startOfDay,
                completed: body.status,
                todoId: 1,
            },
        });

        return c.json({ msg: 'Completion status updated', updateOrCreateCompletionForToday });
    } catch (e) {
        console.error(e); // Logging the error might help in debugging
        return c.json({ msg: 'An error occurred' });
    }
});

Daily.get('/',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate());
const today = new Date(); // Get today's date
const startOfDay = new Date(today.setHours(0, 0, 0, 0)); // Set time to start of the day
const endOfDay = new Date(today.setHours(23, 59, 59, 999));
    try{
        const daily = await prisma.dailytask.findMany({
            include: {
                completions: {
                  where: {
                    date: {
                      gte: startOfDay,
                      lte: endOfDay,
                    },
                  },
                },
              },
        });
        if(daily){
            return c.json(daily);
        }
    }catch(e){
         c.status(411)
        return c.json({msg:"error while finding"});
    }
})
Daily.put('/Delete', async (c) => {
    const body = await c.req.json();
    try{
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());
        const del =await prisma.dailytask.delete({
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