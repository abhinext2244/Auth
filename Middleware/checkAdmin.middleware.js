const checkAdmin=(req,res,next)=>{
  if(req.body.role==="admin"){
    next()
  }else{
    res.status(504).send("you are not Autrozied to access this route")
  }
}
module.exports=checkAdmin