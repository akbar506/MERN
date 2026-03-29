const express = require("express")
const path = require("path")
const userModel = require("./models/user")

const app = express();

app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/read", async (req, res) => {
    const users = await userModel.find();
    res.render("read", { users })
})

app.post("/create", async (req, res) => {
    const { name, email, image } = req.body;
    await userModel.create({
        name,
        email,
        image
    })

    res.redirect("/read")
})

app.get("/delete/:userId", async (req, res) => {
    await userModel.findOneAndDelete({ _id: req.params.userId })

    res.redirect("/read")
})

app.get("/edit/:userId", async (req, res) => {
    const user = userModel.findOne({ _id: req.params.userId });
    console.log(user)
    res.render("edit", { user })
})

app.listen(3000);