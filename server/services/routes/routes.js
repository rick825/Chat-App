const express = require('express');
const route  = express.Router();
const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator');
const controller = require('../controller/controller');
const {User, Group} = require('../model/model');

// Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
   user: process.env.EMAIL,
   pass: process.env.APP_PASS,
  },
});

// Generate OTP
function generateOTP() {
  const digits = '0123456789';
  let otp = '';

  for (let i = 0; i < 6; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }

  return otp;
}
//send OTP
route.post('/api/sendOtp', (req, res) => {
  const email = req.body.value;

  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

  if(!email) return res.status(400).json({error:"Email is required"});
  console.log("Email-->", email);
  const otp = generateOTP();
    
  const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Your OTP for Verification',
      text: `Your OTP is: ${otp}. This OTP is valid for 5 minutes.`
  };

    //transporter
    transporter.sendMail(mailOptions, (error, info) => {
       if (error) {
          console.log('Error sending OTP:', error);
          return res.status(500).json({ error: 'Failed to send OTP' });
       } else {
          console.log('OTP sent:', info.response);
          return res.status(200).json({ otp: otp, message: "OTP has been sent successfully." });
       }
    });


});

//verify user
route.post('/api/verifyuser',async (req,res)=>{
  try {
    const value = req.body.value;
    console.log(value);
    
    const email = value.toLowerCase();
 
    if(!email) {
      console.log("Email is Required",email);
      return res.status(400).json({message : "Email is required!"});
  }
    const user = await User.findOne({email:email});
 
    if(user){
     console.log("User Found");
     return res.status(200).json({message:"Email Verified User Found!!"});
    }else{
     console.log('User Not Found');
     return res.status(204).json({message : 'User not found'});
    }
   
  } catch (error) {
    console.log({error:"Error while Login"});
    return res.status(500).json({error:"Server Error"})
  }
 });

 


 route.get('/api/group', async (req, res) => {
  try {
    console.log("Running");
    const groups = await Group.find().populate('owner').exec();

    if(!groups || groups.length === 0){
      return res.status(204).json({message:"No Groups Found"});
    }

    console.log("Groups-->", groups);

    return res.status(200).json(groups);
  } catch (error) {
    console.log("Error while getting group:", error);
    res.status(500).json({ error: "Error while getting group" });
  }
});

route.post('/api/signup',controller.signup);
route.post('/api/login', controller.login);
route.post('/api/upload-profile-image,',controller.addPhoto);
route.post('/api/createGroup', controller.createGroup);
route.post('/api/joinGroup', controller.joinGroup);
route.post('/api/editGroup', controller.editGroup);
route.post('/api/deleteGroup',controller.deleteGroup)

module.exports = route;