const asyncHandler =  require('express-async-handler')
const User  = require("../models/userModel")
const generateToken = require("../config/generateToken")

const protech = asyncHandler(async(req, res, next) => {
    let token;

    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ){
        try {
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user
        } catch (error) {
            
        }

    }
})