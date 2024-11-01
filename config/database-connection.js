const mongoose=require('mongoose');
const config=require('config');
const dbgr=require("debug")("development:mongoose");


mongoose
.connect(`${config.get('MONGODB_URI')}/melano`)
.then(function(){
    dbgr(`connected at ${mongoose.connection.host}: ${process.env.port}`);
})
.catch((err)=>{
dbgr(err);
});


module.exports=mongoose.connection;