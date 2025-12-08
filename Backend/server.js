const express = require("express")
const chats = require("./data/data")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const userRoutes = require("./routes/userRoutes")
const chatRoutes = require("./routes/chatRoutes")
const {notFound, errorHandler} = require("./middlewares/errorsMiddlewares")
const cors = require("cors")
dotenv.config()
connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send("API is running!")
})

app.use('/api/user', userRoutes)
app.use('/api/chat', chatRoutes)

// Error handlers after routes
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))