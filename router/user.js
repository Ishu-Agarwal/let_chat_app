const express = require("express");
const router = express.Router();
const connection_url='mongodb+srv://ishu:ishu@cluster0.q2xue.mongodb.net/whatsappdb?retryWrites=true&w=majority';
const User = require("../schemma/user");
router.post('/Add',async (req,res)=>{
    console.log(req.body);
    const user=new User(req.body);
    const userr= req.body.email;
    const use1 =req.body.femail;
    const user1=new User({doa:user.doa,email : use1,femail: userr});
    console.log(user1);
    console.log("hello");
    

    const userdata = await User.find({email : userr,femail: use1});
    try{
        if(userdata.length==0){
            await user.save();
            await user1.save();
            res.status(200).json({message : "successful inserted!"});
        }
     }
     catch(err)
     {
        res.status(400).json({message : "error"});
        console.log(err);
     }
     //part1
});

router.post('/Show',async (req,res) =>{
     console.log(req.body);
    try{
            
            const userr = req.body.email;
            const userdata = await User.find({email : userr});
            res.status(200).send(userdata);
    }catch (err)
    {
        res.status(400).json({meassge:"invalid credentials"});
    }
});
module.exports = router;
