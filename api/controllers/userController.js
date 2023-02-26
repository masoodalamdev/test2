import UserModel from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import transporter from '../config/emailConfig.js'

class UserController {
  static userRegistration = async (req, res) => {
    const { name, fatherName, email, contact, cnic, gender, qualification, city, address, password, password_confirmation, dob, img, schoolNme, schoolContact, regType, salary, experience,  role, tc } = req.body
    const user = await UserModel.findOne({ email: email })
    if (user) {
      res.send({ "status": "failed", "message": "Email already exists" })
    } else if (role === "SCHOOL" && name === "abc" && schoolNme){
      res.send({"message": "School selected, name = abc & schoolname value is available"})
    }else
    {
      if (name && fatherName && email && password && password_confirmation && contact && cnic && gender && qualification && city && address && dob && img && role && tc) {
        if (password === password_confirmation) {
          try {
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password, salt)
            const doc = new UserModel({
              name: name,
              fatherName: fatherName,
              email: email,
              password: hashPassword,
              contact: contact,
              cnic: cnic,
              gender: gender,
              qualification: qualification,
              city: city,
              address: address,
              dob: dob,
              img: img,
              role: role,
              tc: tc
            })
            await doc.save()
            const saved_user = await UserModel.findOne({ email: email })
            // Generate JWT Token
            const token = jwt.sign({ userID: saved_user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
            res.status(201).send({ "status": "success", "message": `${name + " Registered as " + role + " Succesfully"}`, "token": token, })
          } catch (error) {
            console.log(error)
            res.send({ "status": "failed", "message": "Unable to Register" })
          }
        } else {
          res.send({ "status": "failed", "message": "Password and Confirm Password doesn't match" })
        }
      } else {
        res.send({ "status": "failed", "message": "All fields are required" })
      }
    }
  }

  static userLogin = async (req, res) => {
    try {
      const { email, password } = req.body
      if (email && password) {
        const user = await UserModel.findOne({ email: email })
        if (user != null) {
          const isMatch = await bcrypt.compare(password, user.password)
          if ((user.email === email) && isMatch) {
            // Generate JWT Token
            const token = jwt.sign({ 
              userID: user._id,
              userName: user.name,
            
            }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })
            res.send({ "status": "success", "message": "Login Success", "token": token , "name": user.name})
          } else {
            res.send({ "status": "failed", "message": "Email or Password is not Valid" })
          }
        } else {
          res.send({ "status": "failed", "message": "You are not a Registered User" })
        }
      } else {
        res.send({ "status": "failed", "message": "All Fields are Required" })
      }
    } catch (error) {
      console.log(error)
      res.send({ "status": "failed", "message": "Unable to Login" })
    }
  }

  static changeUserPassword = async (req, res) => {
    const { password, password_confirmation } = req.body
    if (password && password_confirmation) {
      if (password !== password_confirmation) {
        res.send({ "status": "failed", "message": "New Password and Confirm New Password doesn't match" })
      } else {
        const salt = await bcrypt.genSalt(10)
        const newHashPassword = await bcrypt.hash(password, salt)
        await UserModel.findByIdAndUpdate(req.user._id, { $set: { password: newHashPassword } })
        res.send({ "status": "success", "message": "Password changed succesfully" })
      }
    } else {
      res.send({ "status": "failed", "message": "All Fields are Required" })
    }
  }

  static loggedUser = async (req, res) => {
    res.send({ "user": req.user })
    console.log(req.user)
  }

  static sendUserPasswordResetEmail = async (req, res) => {
    const { email } = req.body
    if (email) {
      const user = await UserModel.findOne({ email: email })
      if (user) {
        const secret = user._id + process.env.JWT_SECRET_KEY
        const token = jwt.sign({ userID: user._id }, secret, { expiresIn: '15m' })
        const link = `http://localhost:3000/reset/${user._id}/${token}`
        console.log(link)
        // // Send Email
        let info = await transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: user.email,
          subject: "EMS - Password Reset Link",
          html: `<a href=${link}>Click Here</a> to Reset Your Password`
        })
        res.send({ "status": "success", "message": "Password Reset Email Sent... Please Check Your Email" })
      } else {
        res.send({ "status": "failed", "message": "Email doesn't exists" })
      }
    } else {
      res.send({ "status": "failed", "message": "Email Field is Required" })
    }
  }

  static userPasswordReset = async (req, res) => {
    const { password, password_confirmation } = req.body
    const { id, token } = req.params
    const user = await UserModel.findById(id)
    const new_secret = user._id + process.env.JWT_SECRET_KEY
    try {
      jwt.verify(token, new_secret)
      if (password && password_confirmation) {
        if (password !== password_confirmation) {
          res.send({ "status": "failed", "message": "New Password and Confirm New Password doesn't match" })
        } else {
          const salt = await bcrypt.genSalt(10)
          const newHashPassword = await bcrypt.hash(password, salt)
          await UserModel.findByIdAndUpdate(user._id, { $set: { password: newHashPassword } })
          res.send({ "status": "success", "message": "Password Reset Successfully. Redirecting to Login Page..." })
     
        }
      } else {
        res.send({ "status": "failed", "message": "All Fields are Required" })
      }
    } catch (error) {
      console.log(error)
      res.send({ "status": "failed", "message": "Invalid Token" })
    }
  }

  // custom work started

  static getUsers = async (request, response) => {
    try{
        const users = await UserModel.find();
        response.status(200).json(users);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }

}
  static getRoleAdmin = async (request, response) => {
    try{
        const users = await UserModel.findOne({role:"ADMIN"})
        response.status(200).json(users);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }

}
  static getRoleAdmin = async (request, response) => {
    try{
        const users = await UserModel.find({role:"ADMIN"})
        response.status(200).json(users);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }

}
  static getRoleSchool = async (request, response) => {
    try{
        const users = await UserModel.find({role:"SCHOOL"})
        response.status(200).json(users);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }

}
  static getRoleTeacher = async (request, response) => {
    try{
        const users = await UserModel.find({role:"TEACHER"})
        response.status(200).json(users);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }

}
  static getRoleStudent = async (request, response) => {
    try{
        const users = await UserModel.find({role:"STUDENT"})
        response.status(200).json(users);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }

}

  // custom work ended




}

export default UserController