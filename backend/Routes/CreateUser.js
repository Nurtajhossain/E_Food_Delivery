const express=require('express')
const { Await } = require('react-router-dom')
const router= express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');

const jwt=require('jsonwebtoken');

const bcrypt= require('bcryptjs');
const jwtSecret="mynameisrandomtextforfullfilled";

router.post("/createuser",[
  // used express-validation for validate name email password
  body('email').isEmail(),
  // name must be at least 5 chars long
  body('name').isLength({ min: 5 }),
  // password must be at least 5 chars long
  body('password','Incorrect Passsword').isLength({ min: 5 })]
,async (req,res)=>{

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  // Hashing the password
  const salt = await bcrypt.genSalt(10);
  let secPassword= await bcrypt.hash(req.body.password,salt);

  try {
  await  User.create({
        name:req.body.name,
        password:secPassword,
        email:req.body.email,
        location:req.body.location
    })
    res.json({success:true});


  } catch (error) {
    console.log(error)
    res.json({success:false});
  }
})

//       Log In     //

// for checking data from database to log in user
router.post("/loginuser",[
  // used express-validation for validate name email password
  body('email').isEmail(),
  // password must be at least 5 chars long
  body('password','Incorrect Passsword').isLength({ min: 5 })],
async (req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }


 let email=req.body.email;

  try {
  let userData= await  User.findOne({email})
    if(!userData){
      return res.status(400).json({ errors:"Try login with correct credentials" });
    }
    
    // for login password is compared to the mongoDB data with Hashing bcrypt
    const pwdCompare= await bcrypt.compare(req.body.password,userData.password)
    if(!pwdCompare){
      return res.status(400).json({ errors:"Try login with correct credentials" });
    }

    //Creating authToken
    const data={
      user:{
        id: userData.id
      }
    }
    const authToken=jwt.sign(data,jwtSecret);
    return res.json({success:true,authToken:authToken});

  } catch (error) {
    console.log(error)
    res.json({success:false});
  }
})
module.exports= router;