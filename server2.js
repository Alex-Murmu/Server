const express = require("express");
const mongooes = require('mongoose');
const z =  require('zod');
const jwt = require('jsonwebtoken')
const app = express();
const port = 2000;
const jwtsecret = "apnacode"
app.use(express.json());

// user Schema
const validateUser=(obj)=>{
    const schema = z.object({
        username:z.string(),
        email:z.string().email(),
        password:z.string().min(8)
    });
    return schema.safeParse(obj);
}
// mongoose model 
const User = new mongooes.model('user',{
    username:String,
    email:String,
    password:String
})
//connecting database 
mongooes.connect("mongodb+srv://ftalexrayen:2frdH6xQ0HoEIpXz@cluster0.ew5fs.mongodb.net/").then(()=>{
    console.log("db Connected")
}).catch((error)=>{console.log(error.message)})


app.post('/',async (req,res)=>{
   const user =  validateUser(req.body);
   
   console.log(user)
   if(!user.success){
    return res.json({message:"input is not validate yet",disrciption:user})
   }
   const {username,email,password} = req.body;

   //hasing password 
   const token = jwt.sign({password},jwtsecret,{expiresIn:"1h"})
   const userToSave = new User({
    username,
    email,
    password:token
   }) 

   try{
     await userToSave.save();
     res.status(200).json({message:"user saved in database",userToSave})
    
   }catch(error){
    return res.json({message:"database is on but error", error:error.meassage})
   }
   
})
app.use((error,req,res,next)=>{
    res.status(500).json({message:error.meassage})
})
app.listen(port)
