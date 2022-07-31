const express = require('express')
const app = express();
const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config({path:"./config.env"})
 require("./db/conn");
app.use(express.json());
app.use(cors({
    credentials:true,
    origin:'http//localhost:3000',
}));
app.use(require('./router/message'));
app.use(require('./router/user'));

const port = process.env.PORT || 5000;
if ( process.env.NODE_ENV == "production"){

    app.use(express.static("whatsapp-app/build"));
  
    // const path = require("path");
  
    // app.get("*", (req, res) => {
  
    //     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  
    // })
  }
app.listen(port,()=>{
    console.log(`connection is set up ${port}`);
})