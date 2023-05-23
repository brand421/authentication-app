const express = require('express');
const bodyParser = require('body-parser');
const ejs = require ('ejs');
const mongoose = require('mongoose');

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended:true }));

const uri = require(__dirname + "/mongodburl.js");
const url = Object.values(uri).toString();

mongoose.connect(url, { useNewUrlParser: true });

const userSchema = {
    email: String,
    password: String
}

const User = new mongoose.model("User", userSchema);

app.get("/", function(req, res) {
    res.render("home");
})

app.get("/login", function(req, res) {
    res.render("login");
})

app.get("/register", function(req, res) {
    res.render("register");
})

app.post("/register", function(req, res) {
    const newUser = new User ({
        email: req.body.username,
        password: req.body.password
    });
    
    newUser.save();
})

app.post("/login", function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({email: username})
        .then(function(results) {
            if(!results) {
                console.error();
            } else {
                if(results.password === password) {
                    res.render("secrets");
                }
            }
        })
})

app.listen(3000, function() {
    console.log("Server is running on port 3000");
})