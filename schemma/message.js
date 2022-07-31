const mongoose=require("mongoose");
const validator = require("validator");
const messageSchema= new mongoose.Schema({
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
   
    message:{
        type:String,
        required:true
    },
    
})
const Message = new mongoose.model('message',messageSchema);
module.exports=Message;
