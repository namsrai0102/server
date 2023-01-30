const express = require('express');
const cors = require('cors');
const fs = require("fs");


 const port =8000;

 const server =  express();
 server.use(cors());
 server.use(express.json());

 server.get('/',(req, res)=>{
    res.status(200).json({message:"hello Express Server"});
 });
 server.post("/signup",(req,res)=>{
    const {name, role} = req.body;
    fs.readFile("users.json","utf-8",(err, data)=>{
        if (err){
            console.log("Fail error");
            return;
        }
        console.log(data);
        const parsedData = JSON.parse(data);
        const newUser = { name, role, id: parsedData.users.length};
        parsedData.users.push(newUser);
        fs.writeFile("users.json", JSON.stringify(parsedData),(err)=>{
            if (err){
                res.status(400).json({ massage: "Error"});
            }
            res.status(201).json({ massage: "Create new user"});
        });
    });
 });
 server.get('/users',(req, res)=>{
    fs.readFile("users.json","utf-8",(err,data)=>{
        if(err){
            console.log("fail error");
            return;
        }
            console.log(data);
            const parsedData=JSON.parse(data);
            res.status(201).json({users: parsedData.users});
      });
    
   
 });
 server.get('/users/:id',(req, res)=>{
    const {id}= req.params;
    const user= users.find((el)=>el.id === id);
    res.status(200).json({user});
 });
 server.listen(port,()=>{
    console.log(`server is running at ${port}`);
 });