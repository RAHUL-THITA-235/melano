const jwt=require('jsonwebtoken');
const userModel = require('../models/owner-model');
const ownerModel = require('../models/owner-model');

module.exports=async(req,res,next)=>{
    if(!req.cookies.token){
        req.flash("error","You need to login first.");
        return res.redirect('/');
    }
    try {
        let decoded=jwt.verify(req.cookies.token ,process.env.JWT_KEY);
        let owner=await ownerModel.findOne({email:decoded.email}).select("-password");

        req.owner=owner;


        next();
    } catch (err) {
        console.log(err.message);
        req.flash("error","Something went wrong.");
        res.redirect("/");
    }
}