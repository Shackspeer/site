const express = require("express");
const middleWare = require("./middleware")
const app = new express()
const cors = require("cors")
const db = require("./dbConnecter")
const port = 3000;
const bodyParser = require("body-parser");
const { networkInterfaces } = require("os");

const networks = networkInterfaces();

const results = Object.create(null)

for(const name of Object.keys(networks)){
    for(const net of networks[name]){
        
        
        const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
        if (net.family === familyV4Value && !net.internal) {
            if (!results[name]) {
                results[name] = [];
            }
            results[name].push(net.address);
        }
    }
}

const serverIp = results['Wi-Fi'][0]



app.use(cors())
app.use(bodyParser.json())
app.listen(port,()=>{
    console.log("app running")
    console.log("ip adress : " + serverIp)
})

app.get("/",(req,res)=>{
    db.getAllUsers(req,res)
})

app.post("/addUser",middleWare.errorFilterer,(req,res)=>{
    db.safeUserAdd(req,res)
})

app.post("/userControl",middleWare.loginFilterer,(req,res)=>{
    db.toLogin(req,res)
})

app.post("/userData",(req,res)=>{
    db.getUserDataByEmail(req,res)
})
app.post("/updatePseudo",(req,res)=>{
    db.changePseudo(req,res)
})
app.post("/updateGsm",(req,res)=>{
    db.changeGsm(req,res)

})
app.post("/updateEmail",(req,res)=>{
    db.changeEmail(req,res)
})

app.post("/addHobbies",(req,res)=>{
    db.addHobbies(req,res)
})
app.post("/addEducation",(req,res)=>{
    db.addEducation(req,res)
})
app.post("/addGoal",(req,res)=>{
    db.addGoal(req,res)
})
app.post("/getSpesifics",(req,res)=>{
    db.getAllSpesifics(req,res)
})
app.post("/createCart",(req,res)=>{
    db.createSpecificUserCart(req,res)
})
app.get("/createCart/:id",(req,res)=>{
   
    db.getSpecificCart(req,res)
})
app.get("/remove/:userId/:id",(req,res)=>{
    db.removeProduct(req,res)
})
app.post("/createUserCart",(req,res)=>{
    db.createUserCart(req,res)
})
