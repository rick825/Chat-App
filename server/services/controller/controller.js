const { User, Group }  = require('../model/model');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');


const secretKey = process.env.JWT_SECRET;

const generateJWT = (userid) =>{
  try {
    const payload = { userId: userid }; 
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    return token;
  } catch (error) {
    console.log("Error While Generating token->",error);
  }
 
}


exports.signup = async (req,res)=>{
  try {
    const {fname, lname, mobilenumber, email} = req.body;

    if(!fname || !lname || !mobilenumber || !email){
      return res.status(400).json({message: "Please Provide Above Data"});
    }

    const user = new User({
      fname,
      lname,
      mobilenumber,
      email
    })

    await user.save();
    const result = generateJWT(user._id);

    if(result){ 
    console.log("User Validated Succesfully & Loggedin");
    return  res.status(200).json({name:user.fname,userid:user._id,message:"User Validated Successfully & Logging you In",token:result});
    }
  } catch (error) {
    console.log({"Error while Signup":error});
    return res.status(500).json({"Error while Signup":error})
  }
}

exports.login = async (req,res)=>{
  try {
    let {email} = req.body;

    email = email.toLowerCase();
 
    if(!email) return res.status(400).json({message : "Email is required!"});
 
    const user = await User.findOne({email:email});
 
    if(user){
      const result = generateJWT(user._id);

      if(result){ 
       return res.status(200).json({name:user.fname,userid:user._id,message:"OTP Verified! Login Successful",token:result,user:user})
      }
      
    }else{
     console.log('User Not Found');
     return res.status(401).json({message : 'User not found'});
    }
   
  } catch (error) {
    console.log({error:"Error while Login"});
    return res.status(500).json({error:"Server Error"}) 
  }
}

//add Photo
// Backend controller
exports.addPhoto = async (req, res) => {
  console.log("Running 2");
  try {
    console.log("Running");
    const loggedInUser = JSON.parse(req.body.loggedInUser); 

    if (!req.file) {
      return res.status(400).json({ error: "No image file uploaded." });
    }


    const imagePath = req.file.path;
    console.log("image Path-->",imagePath);
    const updatedUser = await User.findByIdAndUpdate(loggedInUser._id, { profileImage: imagePath }, { new: true });

   
    res.status(200).json({ success: true, message: "Image uploaded and user profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error while adding image:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



exports.createGroup = async  (req,res) =>{
  try {
  
    const { groupFormData, loggedInUser, uniqueId } = req.body;
    const { name, topic, participants } = groupFormData;
    const {email,userid} = loggedInUser;

  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findOne({email:email});

    if(!user){
      return res.status(404).json("Cannot Found User");
    }

    const group = new Group({
      Gid: uniqueId,
      name ,
      topic,
      participants,
      owner: user._id,
    })

    await group.save();

    return res.status(201).json({ message: 'Group created successfully' });

    
  } catch (error) {
    console.log({error:"Error while Creating Group"});
    return res.status(500).json({error:"Server Error"});
  }
}


//edit group

exports.editGroup = async (req, res) => {
  try {
    const { groupFormData, editGroup } = req.body;
    const { name, topic, participants } = groupFormData;
    
    const parsedParticipants = parseInt(participants);

    const updatedGroup = await Group.findByIdAndUpdate(editGroup._id, {
      name,
      topic,
      participants: parsedParticipants 
    });

    if (!updatedGroup) {
      return res.status(404).json({ Error: "Group not found" });
    }

    return res.status(201).json({ Message: "Group updated successfully", updatedGroup });

  } catch (error) {
    console.log(`Error while editing: ${error}`);
    return res.status(500).json({ Error: "Error while editing" });
  }
}

//delete Group
exports.deleteGroup = async (req, res) => {
  try {
    const { group } = req.body; 

    const groupId = group._id;
    const groupName = group.name;
    const deletedGroup = await Group.findByIdAndDelete(groupId);

    if (!deletedGroup) {
      return res.status(404).json({ Error: "Group not found" });
    }

    return res.status(200).json({ Message: "Group deleted successfully",groupName: groupName });

  } catch (error) {
    console.log("Error while deleting group", error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

//join Group
exports.joinGroup = async (req, res) => {
  try {
    const { group, loggedInUser } = req.body;
    const memberId = loggedInUser._id; 
    
    console.log("User:", loggedInUser);
    const groupId = group._id;

    const existingGroup = await Group.findOne({ _id: groupId });

    if (!existingGroup) {
      return res.status(404).json({ Error: "Group not found" });
    }

    console.log("Existing group members:", existingGroup);

    if (existingGroup.members.memberId.includes(memberId)) {
      return res.status(400).json({ Error: "Member already in the group" });
    }

    existingGroup.members.memberId.push(memberId); 
    const updatedGroup = await existingGroup.save();

    return res.status(200).json({ message: "Joined group successfully", group: updatedGroup });
    
  } catch (error) {
    console.log("Error while joining group:", error);
    return res.status(500).json({ Error: "Internal Server Error", error });
  }
}

//leave Group
exports.leaveGroup = async (req,res)=>{
  try {
    const { group, loggedInUser } = req.body;
    const memberId = loggedInUser._id; 
    
    console.log("User:", loggedInUser);
    const groupId = group._id;

    const existingGroup = await Group.findOne({ _id: groupId });

    if (!existingGroup) {
      return res.status(404).json({ Error: "Group not found" });
    }

    console.log("Existing group members:", existingGroup);

    if (!existingGroup.members.memberId.includes(memberId)) {
      return res.status(400).json({ Error: "Member not in the group" });
    }

    existingGroup.members.memberId.remove(memberId); 
    const updatedGroup = await existingGroup.save();

    return res.status(200).json({ message: "Left group successfully", group: updatedGroup });

  } catch (error) {
    console.log("Error While Leaving Group",error);
    return res.status(500).json({Error: "Internal Server Error",error});
  }
}
