const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    fname:{
        type:String,
        required: true,
    },
    lname:{
        type: String,
        required: true
    },
    mobilenumber:{
        type : Number ,
        required: true
    },
    email:{
        type: String,
        unique : true,
        required: true
    },
    image:{
       type: String
    } 
})


const groupSchema = mongoose.Schema({
    Gid:{
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    topic:{
       type: String,
       required: true
    },
    participants:{
        type: Number,
        required: true
    },
    members:{
        memberId:[{type:mongoose.Types.ObjectId, ref:'User'}],
       
    },
    owner:{
        type: mongoose.Types.ObjectId,
        ref: "User", 
        required: true
    },  
   })




const User = mongoose.model("User",userSchema);
const Group = mongoose.model("Group",groupSchema);


module.exports = {User, Group};