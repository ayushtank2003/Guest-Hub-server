const mongoose=require("mongoose")

const userSchema = new mongoose.Schema(
    {
        firstName:{
            type:String ,
            required : true,
        },
        laststName:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            require:true,
        },
        profileImagePath:{
            type:String,
            default:"",
        },
        tripList:{
            type:Array,
            default:[],
        },
        wishList:{
            type:Array,
            default:[],
        },
        propertyList:{
            type:Array,
            default:[],
        },
        reservationList:{
            type:Array,
            default:[],
        },
    },
    {
        timestamps:true
    }
)
const User=mongoose.model("user",userSchema)
module.exports=User