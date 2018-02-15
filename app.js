var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
});

var Campground = mongoose.model("Campground", campgroundSchema);

/*Campground.create(
    {
        name: "Testsite X",
        image: "https://images.pexels.com/photos/803226/pexels-photo-803226.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb",
        description: "Campsite for testing",
    }, function(err, campground){
        if (err) {
            console.log(err)
        } else {
            console.log("NEWLY CREATED CAMPGROUND:");
            console.log(campground);
        }
});*/

app.get("/", function(req, res) {
    res.render("landing");    
});

//INDEX: Show all campgrounds
app.get("/campgrounds", function(req, res) {
    Campground.find({}, function(err, allCampgrounds){
        if (err){
            console.log(err);
        } else {
            res.render("index", {campgrounds: allCampgrounds});
        }
    });
});

//CREATE: Add new campground to database
app.post("/campgrounds", function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    Campground.create(newCampground, function(err, newlyCreated){
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

//NEW: Show form to create new campground
app.get("/campgrounds/new", function(req, res){
    res.render("new");    
});

//SHOW: Shows more info about one campground
app.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
        if (err) {
            console.log(err);
        } else {
            res.render("show", {campground: foundCampground});
        }
    });   
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp server is up");
});