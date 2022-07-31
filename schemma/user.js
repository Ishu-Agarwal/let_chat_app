const mongoose=require("mongoose");

const validator = require("validator");
const userSchema= new mongoose.Schema({
    doa:{
        type:Date,
        require:true
    },
    email:
    {
        type:String ,
        require:true,
        validate(value){
            if(!validator.isEmail(value)){
               throw new Error("invalid email");
           }
       }
    },
    femail:
    {
        type:String ,
        require:true,
        validate(value){
            if(!validator.isEmail(value)){
               throw new Error("invalid email");
           }
       }
    },
    
   
})
const User = new mongoose.model('user',userSchema);
module.exports=User;
