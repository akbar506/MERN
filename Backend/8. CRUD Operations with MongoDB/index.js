const express = require("express")
const app = express();

const userModel = require("./userModel")

app.get('/', (req, res) => {
    res.send("Welcome! :)")
})

app.get('/create', async (req, res) => {
    const newUser = await userModel.create({
        name: "Kamran Hanif",
        email: "kamran@gmail.com",
        age: 20
    })

    res.send(newUser)
})

app.get("/update", async (req, res) => {
    const updatedUser = await userModel.findOneAndUpdate({ email: "ali@gmail.com" }, { name: "Muhammad Akbar Ali" }, { new: true });

    res.send(updatedUser);
})

app.get("/read", async (req, res) => {
    const users = await userModel.find();

    res.send(users);
})

app.get("/delete", async (req, res) => {
    const user = await userModel.findOneAndDelete({ email: "kamran@gmail.com" })

    res.send(user);
})

app.listen(3000);