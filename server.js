/* [Create a server and add all functionality like create ,read ,updata, delete]
*/
const express = require("express");
const port = 2000;
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");




//secret keys 
const jwtsecrets = "sdsadasd";
app.use(express.json())

// connecting mongoDB 
mongoose.connect("mongodb+srv://ftalexrayen:2frdH6xQ0HoEIpXz@cluster0.ew5fs.mongodb.net/")
.then(()=>{console.log("Mongo Db Connected")})
.catch((error)=>(console.log(error.message
)));

// creating user model  and schema 
const User = mongoose.model("bokasgangs",new mongoose.Schema({
    username:String,
    email:String,
    password:String
}))

// middleware to check the user is allready exist
// Middleware to check if the user exists
async function checkUserExists(req, res, next) {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }
  
    try {
      const user = await User.findOne({_id:id});
      console.log(user)
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      // Attach user to the request object for further use
      req.user = user;
      next(); // Pass control to the next middleware or route
    } catch (error) {
      res.status(500).json({ message: "An error occurred", error: error.message });
    }
  }
  



// create means signup route 1.check first user is already exist or what 
app.post('/signup', async (req,res)=>{
    const {username,email,password} = req.body;

    // checking if user is exist already or what
    if(await existUser(username)){
       return  res.status(404).json({message:"User Already exist"});
    }
   
    const token = jwt.sign({username,email,password},jwtsecrets,{expiresIn:"1d"})
    const user = new User({
        username,
        email,
        password:token
    })

   

    try{
        await user.save();
        res.status(200).json({message:"User saved in database",user})
    }catch{(error)=>{
        res.status(404).json("No")
    }}



});


/// update username 

app.put('/update/username',checkUserExists, async (req,res)=>{
    const {username} = req.body;


  try{
    const updateUser = await User.findByIdAndUpdate(req.body.id,{
        username
    },{
        new:true
    });
    res.status(200).json({message:'user Update SuccessFully',updateUser});
  }
  catch(error){
    res.status(404).json({
        message:"Error",
        discription:error.message
    })
  }
});


//update email 
app.put('/update/email',checkUserExists, async(req,res)=>{
 const {email,id} = req.body;

 try{
 const updateUser = await User.findByIdAndUpdate(id,{
    email
 },{new:true});

  return res.status(200).json({message:"User Email Update successfully",updateUser})
}catch(error){
    res.status(404).json({
        message:error.message
    })
}
});

//update password
app.put('/update/password',checkUserExists, async(req,res)=>{
    const {id,password} = req.body;
    
    try{
        const updateUser = await User.findByIdAndUpdate(id,{password},{new:true});
        res.status(200).json({message:"Successfully updated User Password",updateUser})
    }
    catch(error){
        res.status(404).json({message:"Eror",erro:error.message})
    }
})
 
app.get('/userget',checkUserExists,async (req,res)=>{
  const {id,username} = req.body;

 res.status(200).json({
    message:"server can't load"
 })

})

app.listen(port,()=>{
    console.log("server IS onn")
})