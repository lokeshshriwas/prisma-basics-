import express from "express";
import { PrismaClient } from "@prisma/client";  

const Client = new PrismaClient();
const app = express();
const port = 3000;

app.use(express.json()); 

app.get("/", async (req, res) => {
    try {
        const data = await Client.todo.findMany();
        console.log(data);
        res.send("First fetching is done");
    } catch (error) {
        console.error("Error fetching todos:", error);
        res.status(500).send("Internal Server Error");
    }
});


app.post("/user", async(req, res)=>{
    const {username, password, age, city} = req.body;
    
    const data = await Client.user.create({
        data: {
            username,
            password,
            age,
            city
        }
    })

    if(data){
        res.send("User created successfully")
    } else {
        res.send("something went wrong")
    }
})

app.post ("/addtodo", async(req, res)=>{
    const {title, description, done, userId} = req.body;
    const data = await Client.todo.create({
        data : {
            title,
            description,
            done,
            userId
        }
    })

    if(data){
        res.send("Todo added successfully")
    } else{
        res.send("Something went wrong")
    }
})


app.get('/details/:id', async(req, res)=>{
    const {id} = req.params
    const data = await Client.user.findFirst({
        where: {
            id : parseInt(id)
        },
        select : {
            username : true,
            city: true,
            age : true,
            todos: true
        }
    })

    if(data){
        res.send(data)
    } else{
        res.send("Something went wrong")
    }
})


app.listen(port, () => {
    console.log(`Listening on Port ${port}`);
});
