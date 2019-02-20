const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const port = 3000

// Mongoose config
// TODO: connect to db
mongoose.connect("mongodb://localhost:32768/restful_blog_app", {useNewUrlParser: true})
// TODO: mongoose schema
const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
})
// TODO: mongoose model
const Blog = mongoose.model("Campground", blogSchema)
// mongoose end config
// todo: Создать демо запись в бд
// Blog.create({
//     name: "Test Name",
//     image: "https://hunyadi.info.hu/levente/images/stories/boxplus/image3.jpg",
//     description: "Cool bird"
// })


app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs") // что бы не писать .ejs
app.use(express.static("public")) //

// Todo: Maine page
app.get("/", (req, res) => {
    res.redirect("/blogs")
})

// todo: All blogs
app.get("/blogs", (req, res) => {
    Blog.find({}, (err, blogs) => {
        if (err) {
            console.log(err)
        } else {
            res.render("index", {blogs: blogs})
        }
    })
})
// todo: Page to add new blogpost
app.get("/blogs/new", (req, res) => {
    res.render("new")
})
// todo: CRUD => C-create add post to db
app.post("/blogs", (req, res) => {
    console.log(req.body.blog)
    Blog.create(req.body.blog, (err, newBlog) => {
        if (err) {
            console.log(err)
        } else {
            console.log(newBlog) // newBlog это только что созданый обьект блога из базы
            res.redirect("/blogs")
        }
    })
})
// todo: CRUD => R-read read blogpost from db
app.get("/blogs/:id", (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if (err) {
            res.redirect("/blogs")
        } else {
            res.render("show", {blog: foundBlog})
        }
    })

})
// todo: Show blogpost edit page
app.get("/blogs/:id/edit", (req, res) => {
    res.render("edit")
})
// todo: CRUD => U-update update blogpost with :id
app.post("/blogs/:id", (req, res) => {
    res.render("blogPostPage")
})
// todo: CRUD => D-delete delete blogpost with :id
app.delete("/blogs/:id", (req, res) => {
    res.redirect("index")
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
