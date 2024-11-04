const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');
const { route } = require('./ownersRouter');
const { render } = require('ejs');

router.get('/index',(req,res)=>{
res.render('index',{title:"Melano"});
});

router.get('/', (req, res) => {
    let error = req.flash('error');
    let success = req.flash('success');
    res.render('index', { error, success, title: "Melano", });// loggedin: false
});
router.get('/home',(req,res)=>{
    res.redirect('/index');
})
router.get('/shop', isLoggedIn, async (req, res) => {
    try {
        let products = await productModel.find();
        //console.log("Products fetched:", products);

        res.render("shop", { products, title: "shopping", success: req.flash("success") });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send("Internal Server Error");
    }

});

router.get("/addtocart/:productid", isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email });
    user.cart.push(req.params.productid);
    await user.save();
    req.flash("success", "Added to cart!!!");
    res.redirect("/shop");

});

router.get("/cart", isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email })
        .populate('cart');

    res.render("cart", {
        title: "cart product", user,});


});

router.get('/login',(req,res)=>{
    let error = req.flash('error');
    let success = req.flash('success');
    res.render('log_sign', { error, success, title: "Melano", loggedin: false });
});

router.get('/logout', isLoggedIn, (req, res) => {
    res.clearCookie("token");
    req.flash('success', "logged out");
    res.redirect('/');
});

module.exports = router;
