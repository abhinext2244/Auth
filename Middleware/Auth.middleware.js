const jwt=require("jsonwebtoken")
const blacklisttoken=require("../blacklisttoken")
const auth=(req,res,next)=>{
    const token=req.headers.authorization.split(" ")[1]
    console.log(token)
    if(blacklisttoken.includes(token)){
       return res.send("you are logout please login again")
    }
    jwt.verify(token, process.env.jwt_key1, function(err, decoded) {
       if(err){
        console.log("autrozided or please login")
       }
       if(decoded){
         req.body.username=decoded.name
         req.body.role=decoded.role
        next()
       }
      });
    
}
module.exports=auth