const asyncHandler = require('express-async-handler');
const Chats = require("../models/chatModel")

const accessChat = asyncHandler(async (req, res)=>{
    const {userId} = req.body;

    if(!userId){
        console.log("user id param not sent with request");
        return res.sendStatus(400)
    }

    var isChat = await Chats.find({
        isgroupChat: false,
        $and:[
            {$user:{$elementMatch: {$eq: req.user._id}}},
            {$user:{$elementMatch: {$eq: userId}}},
        ]

    })
    .populate("users", "-password")
    .populate("latestMessage")

    isChat = await User.populate(isChat,{
        path:"latestMessage.sender",
        select:"name pic email"
    })

    if(isChat.length > 0){
        res.send(isChat[0]);
    }else{
        var chatData = {
            chatName: "sender",
            isgroupChat: false,
            users: [req.user._id, userId]
        };
        try{
            const createdChat = await Chats.create(chatData)
            const fullChat = await Chats.findOne({_id: createdChat._id}).populate(
                "users","-password"
            );
            res.status(200).send(fullChat)
    }catch(error){

    }

    }
})

module.exports = {accessChat}