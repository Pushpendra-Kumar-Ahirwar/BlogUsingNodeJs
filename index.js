const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const userRouter = require('./routes/user')
const blogRouter = require('./routes/blog')
const cookieparser = require('cookie-parser');
const checkForAuthenticatinCookie = require("./middlewares/authectication");
const Blog = require('./models/blog')


//APP CREATION
const app = express();
const PORT = 8000;

//MONGODB CONNECTION
mongoose
    .connect("mongodb://localhost:27017/blogify")
    .then((e) => console.log("Mongoose Connected"))
    .catch((e) => console.log("error in mongoose connection", e));

//MIDDLEWARES
app.use(express.urlencoded({ extended: false }))
app.use(cookieparser())
app.use(checkForAuthenticatinCookie('token'))
app.use(express.static(path.resolve('./public')))

//EJS
app.set("view engine", "ejs");
app.set(path.resolve("./views"));

//ROUTES
app.get("/", async(req, res) => {
    const allblogs = await Blog.find({})
    res.render("home", {
        user: req.user,
        blogs: allblogs
    });
});

app.use('/user', userRouter)
app.use('/blog', blogRouter)

app.listen(PORT, () => console.log("app is running on PORT:", PORT));