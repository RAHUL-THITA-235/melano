const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/generateTokens');
const isLoggedIn = require('../middlewares/isLoggedIn');

module.exports.registerUser = async (req, res) => {
    try {
        let { email, password, fullname } = req.body;
        let user = await userModel.findOne({ email: email });
        if (user) {
            let error=req.flash("error", "You already have an account in this email, try another one.");
            res.render('index', { title: "Melano",error,success });
            //return res.send("You already have an account in this email, try another one");
        }
        bcrypt.genSalt(8, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) {
                    res.send(err.message);
                } else {

                    let user = await userModel.create({
                        email,
                        password: hash,
                        fullname
                    });

                    const token = generateToken(user);
                    res.cookie('token', token, { httpOnly: true, secure: true });
                    let error=req.flash("error", "Somethingwent wrong!!!");
                    let success=req.flash("success", "User created succesfully!!!");
                    res.render('index', { title: "Melano",error,success});
                }
            });

        });


    } catch (err) {
        //res.send(err.message);
        req.flash("error", "Incorrect email or password!!!");
        res.redirect("/");
    }
}

module.exports.loginUser = async (req, res) => {
    let { email, password } = req.body;

    let user = await userModel.findOne({ email });
    if (!user) {
        req.flash('error',"Enter a register email !!!");
        return res.redirect("/");}


    bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
            let token = generateToken(user);
            //console.log(token);
            res.cookie("token", token);
            // res.render('shop',{title:"shopping"});
            return res.redirect('/shop');
        }
        else {
            req.flash("error", "Incorrect email or password!!!");
            res.redirect("/");
            // return res.send("Incorrect email or password!!!");
        }
    });

};
