const asyncHandler =  require('express-async-handler')
const User  = require("../models/userModel")
const generateToken = require("../config/generateToken")

const registerUser = asyncHandler( async (req, res) => {
    const {name, email, password, pic} = req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please enter all the required fields!")
    }

    const userExist = await User.findOne({email});
    if(userExist){
        res.status(400)
        throw new Error("User Already Exist!")
    }

    const user = await User.create({
        name,
        email,
        password,
        pic
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error("Failed to create new user")
    }
});


const authUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body
})

const user  = await User.findOne({email})
if(user){
    res.json({
        _id : user._id,
        email: user.email,
        password: user.password,
        pic:  user.pic,
        token: generateToken(user._id)

    })
}else{
        res.status(401)
        throw new Error("Invalid Email and Password")
    }

module.exports = {registerUser}

//16min