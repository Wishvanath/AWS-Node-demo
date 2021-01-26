const router = require("express").Router()
const pool = require('../db')
const bcrypt = require('bcrypt')
const jwtGenerator = require("../utils/jwtGenerator")
const emailVerifyHtml = require("../utils/emailVerifyhtml")
const validInfo = require('../middleware/validInfo')
const authorization = require('../middleware/authorization')
const nodemailer = require('nodemailer');
const randomstring = require("randomstring")
require('dotenv').config()

//register routes
router.post("/register", validInfo, async(req,res)=>{
    try {
        // 1. Destructure the rq.body (name,email,password)
        // console.log(req.body);
        const  { name, email, password} = req.body
        // 2. Check if user exists (if not, throw error)
        const user = await pool.query("SELECT * FROM users_owner WHERE email = $1 limit 1",[
            email
        ])

        if(user.rows.length !== 0){
            return res.status(401).json("User already exists!")
        } else{
        // 3. Bcrypt the user password
        const saltRound = 10
        const salt =  await bcrypt.genSalt(saltRound)  
        // console.log(salt, password);
        const bcryptPassword =  await bcrypt.hash(password,salt)

        // 4. Insert the user inside DB
        let newUser = await pool.query(
            "INSERT INTO users_owner (name, email, password) VALUES ($1, $2, $3) RETURNING * ",
            [name, email, bcryptPassword]
          );
          
        // 5. Generating our jwt token
        // console.log(newUser.rows[0].id);
        const token =  await jwtGenerator(newUser.rows[0].id)
        // console.log(token);
        
        //Send email for verification
        const secretToken = randomstring.generate({
            length:18,
            charset: 'alphanumeric'
          })

          //Update token detail for the registered uer in database
         let updateUser = await pool.query(
            "UPDATE users_owner SET secret_token = $1, jwt_token =  $2 WHERE id = $3   RETURNING * ",
            [secretToken, token, newUser.rows[0].id]
          );
            console.log(process.env.MAIL_USER, process.env.MAIL_PASSWORD);
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                   user: process.env.MAIL_USER,
                   pass: process.env.MAIL_PASSWORD
               },
            //    tls:{
            //     rejectUnauthorized:false
            //   }
            });

           const emailVerifyHtmlText = emailVerifyHtml(email,secretToken,token)
           const mailOptions = {
            from: `"Bunk Byte 👻" <${process.env.MAIL_USER}>`, // sender address
            to: email,              // list of receivers
            subject: 'Confirm your email', // Subject line
            html: emailVerifyHtmlText// plain text body
             };
            let info = await  transporter.sendMail(mailOptions, function (err, info) {
                if(err)
                console.log(err)
                else
                console.log(info);
            });

            res.json({token})
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error")
    }
})


// // login route

router.post("/login", validInfo, async(req,res)=>{
    try {
        console.log(req.body);
        // 1. Destructure the req.body
        const {email,password} = req.body

        // 2. Check if user doesnt exists (if not, throw error)
        const user = await pool.query("SELECT * FROM users_owner WHERE email = $1 limit 1", [
            email
          ]);
          if (user.rows.length === 0) {
            return res.status(401).json("Password or Email is incorrect ");
          }
          else{
                if(user.rows[0].is_verified){

                    // 3. Check if incoming password is same as DB password
                    const validPassword = await bcrypt.compare(password, user.rows[0].password)
                    console.log(validPassword);
                    if (!validPassword) {
                        return res.status(401).json("Password or Email is incorrect ")            
                    }
    
                    // 4. Give them the jwt token
                    const token =  jwtGenerator(user.rows[0].id)
                    res.json({token})
                }
                else{
                    return res.status(401).json("Please verify your email ")  
                }

          }



    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error")

    }
})


router.get("/is-verify", authorization, async(req,res)=>{
    try {
        res.json(true)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error")
    }
})


router.get("/verification" ,  async(req,res)=>{
   try {
    // Verify the user email here if token is valid
    console.log("/verification controller ", req.header("sToken"));
    const sToken = req.header("sToken")
    const email  = req.header("email")
    console.log(sToken)
    console.log(email)
    
    const verifiedUser = await pool.query("SELECT * FROM users_owner WHERE email = $1 and  is_verified = true limit 1",[
        email
    ])
    if (verifiedUser.rows.length !== 0) {
        // return res.status(202).json("User already verified.");
        return res.json({verified: true, message: "Email already verified. Please log in"})
      }
    let updateUser = await pool.query(
        "UPDATE users_owner SET is_verified = true WHERE email = $1 AND secret_token = $2 RETURNING * ",
        [email , sToken ]
      )
      if (updateUser.rows.length === 0) {
        // return res.status(401).json("Invalid veification link");
        return res.json({verified: false, message: "Email verification URL is Invalid"})
      }
      else{
        // return res.status(200).json("Email ID successfully verified. Please login");
        return res.json({verified: true, message: "Email successfully verified. Please log in"})
      }
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error")
    }
})

module.exports = router