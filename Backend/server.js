const express = require("express")
const chats = require("./data/data")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const app = express()

dotenv.config()
connectDB()

const PORT = process.env.PORT || 5000;
app.get('/',(req,res) =>{
    res.send("API is running!")
})

app.use('/api/user', userRoutes)

app.listen(PORT, console.log(`Server started on port ${PORT}`))