const express = require('express');
const mongoose=require('mongoose');
const port=1020;
const db=require('./config/database-connection');

const app=express();
const jwt=require('jsonwebtoken');
const cookieParser=require('cookie-parser');
const upload=require('multer');
const bcrypt=require('bcrypt');
const path=require('path');
const ownersRouter=require('./routes/ownersRouter');
const usersRouter=require('./routes/usersRouter');
const productsRouter=require('./routes/productsRouter');


app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine',"ejs");

/*app.get('/',(req,res)=>{
    res.send('hello');
});*/

app.use('/owners',ownersRouter);
app.use('/users',usersRouter);
app.use('/products',productsRouter);


app.listen(port,(req,res)=>{
    //console.log("Connected");
});