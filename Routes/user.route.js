const express=require("express")
const jwt=require("jsonwebtoken")
 const UserRouter=express.Router()
const userModels=require("../Models/user.model")
const bcrypt=require("bcrypt")
 UserRouter.post("/register",async(req,res)=>{
    const{name,email,age,password}=req.body
    try {
        bcrypt.hash(password,5, async function(err, hash) {
           if(err){
            res.status(500).json({"msg":"occure during hashing password"})
           }else{
            const user= new userModels({
                name,
                age,
                password: hash,
                email
            });
            await user.save()
            res.status(201).json({"msg":"create sucessfully"})
        }
        });
         
    } catch (error) {
        res.status(400).json({"msg":"user not create successfully",error})
    }
 })
 UserRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
        const user= await userModels.findOne({email})
        if(!user){
           return res.status(401).json({"msg":"Invalid creaditals"})
        }
        if(user){
            bcrypt.compare(password,user.password,function(err,result){
                if(result){
                    const accesstoken = jwt.sign({ name:user.name,role:user.role }, process.env.jwt_key1,{expiresIn:"10m"});
                    const refreshtoken = jwt.sign({ name:user.name,role:user.role }, process.env.jwt_key2,{expiresIn:"1day"});
                    res.status(200).json({"msg":"login sucessfully", accesstoken,refreshtoken})

                }else{
                    res.status(400).json("wrong password")
                }
            })
        }
    } catch (error) {
        res.status(504).json({"msg":"login not successfully",error})
    }
 })
 
 module.exports=UserRouter