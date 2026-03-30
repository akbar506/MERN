const express = require("express");
const app = express();

const path = require("path");
const userModel = require("./models/user");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser())
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
        bcrypt.hash(password, salt, async (err, hash) => {
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

app.get("/sign-out", (req, res) => {
    res.clearCookie("token");

    res.redirect("/");
})

app.get("/sign-in", (req, res) => {
    res.render("sign-in");
})

app.post("/sign-in", async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) return res.send("Invalid Credentials (No User found) :(");

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if(!isCorrectPassword) return res.send("Invalid Credentials (Incorrect password) :(");

    let name = user.name;

    const token = jwt.sign({ name, email}, "Secret");

    res.cookie("token", token);

    res.redirect("/");
})

app.get("/profile", (req, res) => {
    const token = req.cookies.token;
    if(!token) return res.send("Sign in First");
    
    const { name, email } = jwt.verify(token, "Secret");

    res.render("profile", {name, email});
    res.render("profile");
})

app.listen(3000);