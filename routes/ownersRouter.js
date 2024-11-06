const express=require('express');
const router=express.Router();
const ownerModel=require('../models/owner-model');

if(process.env.NODE_ENV==="development"){
    router.post('/create',async(req,res)=>{
       // res.send("It's working");
        let owners=await ownerModel.findOne({email:req.email});
        if(owners.length>0)
        {
            req.flash("error","you don't have permisssion to create a new owner");
            return res.redirect("/");
        }
       // 
       let {fullname,email,password}=req.body;
       let createdOwner=await ownerModel.create({
        fullname,
        email,
        password
       });
       req.flash('success',"owner created successfully!!!");
       res.redirect('/');
    });
}

router.get("/admin",(req,res)=>{
   // res.send("Hey owner is working!!!!");
   let success=req.flash("success");
   res.render('createproducts',{success,title:"product creation"});
});

router.get("/create",(req,res)=>{
    // res.send("Hey owner is working!!!!");
    //let success=req.flash("success");
    res.render('owner-login',{title:"owner login"});
 });


module.exports=router;