const express = require("express");
const router = express.Router();
const connection_url='mongodb+srv://ishu:ishu@cluster0.q2xue.mongodb.net/whatsappdb?retryWrites=true&w=majority';
const Message = require("../schemma/message");
const User = require("../schemma/user");
router.post('/Addmessage',async (req,res)=>{
    console.log(req.body);
    const user=new Message(req.body);
    const userr = req.body.email;
    const use1 =req.body.femail;
    const mess=req.body.message;
    try{
        await user.save();
        await User.replaceOne(
            {email : userr , femail : use1},
            {email : userr , femail : use1 , doa : req.body.doa}
        );
        await User.replaceOne(
            {email : use1 , femail : userr},
            {email : use1 , femail : userr , doa : req.body.doa}
        );
        res.status(200).json({message : "success"});
     }
     catch(err)
     {
        res.status(400).json({message : "error"});
         console.log(err);
     }
     //part1
});

router.post('/Showmessage',async (req,res) =>{
     console.log(req.body);
    try{
            
        const userr = req.body.email;
        const userr1 = req.body.femail;
        const userLogin = await Message.find({email : userr , femail:userr1});
        const userLogin1 = await Message.find({email : userr1,femail:userr});
        console.log(userLogin);
        const userLog=[...userLogin,...userLogin1];
        
        res.status(200).send(userLog);
    }
    catch (err)
    {
        res.status(400).json({meassge:"invalid credentials"});
    }
});
module.exports = router;
