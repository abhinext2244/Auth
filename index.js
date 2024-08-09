const express=require("express")
const dotenv=require("dotenv").config()
const connection =require("./config/db")
const UserRouter=require("./Routes/user.route")
const auth=require("./Middleware/Auth.middleware")
const checkAdmin=require("./Middleware/checkAdmin.middleware")
const blacklisttoken=require("./blacklisttoken")
const jwt=require("jsonwebtoken")
const app=express()
const PORT=process.env.PORT || 3000
app.use(express.json())
app.use("/user",UserRouter)
app.get("/",(req,res)=>{
res.send("Welcome")
})
app.get("/dashboard",(req,res)=>{
        res.send("movie data access" )
 })
 app.get("/product",(req,res)=>{
        res.send("product data access" )
 })
 app.get("/cart",auth,(req,res,)=>{
        res.send("cart data access" )
 })
 app.get("/checkout",auth,(req,res)=>{
    console.log('reqbody',req.body)
        res.send("checkout data access" )
   
 })
 app.get("/update",[auth,checkAdmin],(req,res)=>{
    console.log(req.body)
        res.send("update data access" )
    
 })
 app.get("/delete",auth,(req,res)=>{
    res.send("delete data access" )

})
app.get("/logout",(req,res)=>{
    const token=req.headers.authorization.split(" ")[1]
    blacklisttoken.push(token)
    res.send("logout successfully")
})
app.get("/get-accesstoken",(req,res)=>{
    const refreshtoken=req.headers.authorization.split(" ")[1]
    jwt.verify(refreshtoken,process.env.jwt_key2,function(err,decoded){
        if(decoded){
           const accesstoken= jwt.sign({name:decoded.name,role:decoded.role},process.env.jwt_key1,{expiresIn:"10m"})
           res.status(200).json({"msg":"access token generate successfully",accesstoken})
        }
    })
})
app.listen(PORT,async()=>{
    try {
        await connection
        console.log("server is running",PORT)
        
    } catch (error) {
        console.log("server is error",error)
    }
})