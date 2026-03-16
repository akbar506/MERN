const express = require('express')

const app = express()

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware
app.use((req, res, next) => {
    console.log("Middleware");
    next();
})

// Routing
app.get('/', (req, res) => {
    res.send("Hello world")
});

app.get('/profile', (req, res, next) => {
    // res.send("Hello World from Profile page")

    // Assuming that in '/profile' route, an error occured
    return next(new Error("Error Occured! :("));
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
})

app.listen(3000);