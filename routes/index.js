const express=require('express');
const router=express.Router();
const isLoggedIn=require('../middlewares/isLoggedIn');
const productModel = require('../models/product-model');


router.get('/',(req,res)=>{
    let error=req.flash('error');
    res.render('index',{error,title:"Melano"});
});

router.get('/shop',isLoggedIn,async (req,res)=>{
    try {
        let products=await productModel.find();
        //console.log("Products fetched:", products);

        res.render("shop",{products,title:"shopping"});
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send("Internal Server Error");
    }

});

router.get('/logout', isLoggedIn, (req, res) => {
    //req.flash('success', "Logged out successfully");
    res.clearCookie("token"); 


    res.render('index', { 
        title: "Melano", error: req.flash('success',"logged out"),
    });
});

module.exports=router;
