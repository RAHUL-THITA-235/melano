const express=require('express');
const router=express.Router();
const ownerModel=require('../models/owner-model');

if(process.env.NODE_ENV==="development"){
    router.post('/create',async(req,res)=>{
       // res.send("It's working");
        let owners=await ownerModel.find();
        if(owners.length>0)
        {
            return res
            .status(503)
            .send("you don't have permisssion to create a new owner");
        }
       // 
       let {fullname,email,password}=req.body;
       let createdOwner=await ownerModel.create({
        fullname,
        email,
        password
       });
       res.status(201).send(createdOwner);
    });
}

router.get("/admin",(req,res)=>{
   // res.send("Hey owner is working!!!!");
   let success=req.flash("success");
   res.render('createproducts',{success,title:"product creation"});
});











module.exports=router;