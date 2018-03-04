var express = require("express");
var router = express.Router();
var passport = require("passport");
var user = require("../models/user");

//Root route
router.get("/", function(req, res) {
    res.render("landing");    
});

//Register form route
router.get("/register", function(req, res) {
    res.render("register");
});

//Signup logic
router.post("/register", function(req, res) {
    var newUser = new user({username: req.body.username});
    user.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

//Login route
router.get("/login", function(req, res) {
    res.render("login");
});

//Login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res) {
});

//Logout route
router.get("/logout", function(req, res) {
   req.logout();
   req.flash("success", "Logged you out");
   res.redirect("/campgrounds");
});

module.exports = router;