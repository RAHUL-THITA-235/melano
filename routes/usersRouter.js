const express = require('express');
const router = express.Router();
const {registerUser}=require('../controllers/authController');
const{loginUser}=require('../controllers/authController');
const isLoggedIn = require('../middlewares/isLoggedIn');


router.get("/", (req, res) => {
    res.send("Hey user is working!!!!");
});

router.post("/register",registerUser);
router.post("/login",loginUser);

module.exports = router;