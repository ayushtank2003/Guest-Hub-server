const router = require("express").Router()
const bcrypt= require("bcryptjs")
const jwt = require("jsonwebtoken")
const multer = require("multer")

const User =require("../models/userModel")

// configuration multer for file upload
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public/upload/")//store uploaded files in the "uploads" folder
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)//use the original file name
    }
})

const upload=multer({storage})

router.get("/",()=>{
    console.log("abcsd");
})

//user register
router.post("/register",upload.single('profileImage'),async (req,res)=>{
    
    console.log('Incoming registration request:', req.body);
    try{
        //TAKE ALL INFORMATION FROM THE 
        const {firstName,lastName,email,password}=req.body

        //the uploaded file is available as req.file
        // const profileImage=req.file

        // if (!profileImage){
        //     return res.status(400).send("No file uploaded")
        // }

        //path to the uploaded profile photo
        // const profileImagePath=profileImage.path

        //CHECK IF USER EXISTS
        const existingUser =await User.findOne({email})
        if (existingUser){
            return res.status(409).json({
                message:"user already exists!"
            })
        }

        //hass the password
        const salt=await bcrypt.genSalt()
        const hashPassword=await bcrypt.hash(password, salt)

        //create a new user
        const newUser = new User({
            firstName,
            lastName,
            email,
            password:hashPassword,
            // profileImagePath,
        });

        //save the newUser
        await newUser.save()

        //send a successful message

        res.status(200).json({message:"user created succesfully! ",User:newUser})
                
    }catch(err){
        console.log(err)
        res.status(500).json({message:"registration failed",error:err.message })

    }
});


//USER lOGIN

router.post("/login",async(req,res)=>{
    try{
       // take the information from the form
        const {email,password}=req.body

        //check if user exist 
        const user =await User.findOne({email})
        if (!user){
            return res.status(409).json({message:"user doesn't exist!"})
        }

        //Compare the password with the hashed password
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:"invalide crediential"})
        }

        //generate jwt token
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
        delete user.password

        res.status(200).json({token,user})
    }catch(err){
        console.log(err)
        res.status(500).json({error:err.message            })

    }
})
module.exports=router