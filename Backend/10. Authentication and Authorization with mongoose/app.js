const express = require("express");
const app = express();

const path = require("path");
const userModel = require("./models/user");
const bcrypt = require("bcrypt");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.send("Welcome");
})

app.get("/sign-up", (req, res) => {
    res.render("sign-up");
})

app.post("/sign-up", (req, res) => {
    const { name, email, password, age } = req.body;

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt,  async (err, hash) => {
            await userModel.create({
                name,
                email,
                password: hash,
                age
            })
        });
    })

    res.redirect("/sign-up");
})

app.listen(3000);