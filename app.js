const express = require("express");
const app = express();
port = 1010;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use("/", require("./route/home"));
app.use(express.static("public"));

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/portfolio", {
  useNewUrlParser:true,
  useUnifiedTopology:true 
},(err) =>{
  if (!err) {

    console.log('connected to db')
  } else {
    console.log('error')
  }
})
  

const schema = {
    name:{
        type:String,
        required:true,
      
    },
    
    email:{
        type:String,
        required:true,
        // unique:true
    },
    message:{
        type:String,
        required:true 
    }
}
const monmodel = mongoose.model('portfolio',schema)
   
app.post("/home", async(req, res) => {

 const data = new monmodel({
  name:req.body.name,
  email:req.body.email,
  message:req.body.message
 })
  
const val = await data.save();
//  res.json(val);

 if (val != null) {  
  res.render('home')
 } else {
  console.log('!!!fill form')
 }




});

app.listen(process.env.PORT, ()=>{
  console.log('localhost:1010')
})
