const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use((req, res, next) => {
    console.log("Middleware");
    next();
})

app.get("/", (req, res, next) => {
    // res.send("Home Page")

    // We are using "res.render" to render the html page
    res.render("index")
})

// Dynamic Routing
app.get("/profile/:username", (req, res) => {
    res.send(`Username: ${req.params.username}`)
})

app.get("/profile/:username/:age", (req, res) => {
    res.send(`Username: ${req.params.username}, Age: ${req.params.age}`);
})

app.get("/error", (req, res, next) => {
    return next(new Error("Error Occured :("));
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!")
})

app.listen(3000, () => {
    console.log("Server Started! :)")
})