var express = require("express");
var app = express();

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
        {name:"Testsite 1", image: "https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb"},
        {name:"Testsite 2", image: "https://images.pexels.com/photos/803226/pexels-photo-803226.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb"},
        {name:"Testsite 3", image: "https://images.pexels.com/photos/618848/pexels-photo-618848.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb"},
        {name:"Testsite 1", image: "https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb"},
        {name:"Testsite 2", image: "https://images.pexels.com/photos/803226/pexels-photo-803226.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb"},
        {name:"Testsite 3", image: "https://images.pexels.com/photos/618848/pexels-photo-618848.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb"},
        {name:"Testsite 1", image: "https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb"},
        {name:"Testsite 2", image: "https://images.pexels.com/photos/803226/pexels-photo-803226.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb"},
        {name:"Testsite 3", image: "https://images.pexels.com/photos/618848/pexels-photo-618848.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb"},
        {name:"Testsite 1", image: "https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb"},
        {name:"Testsite 2", image: "https://images.pexels.com/photos/803226/pexels-photo-803226.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb"},
        {name:"Testsite 3", image: "https://images.pexels.com/photos/618848/pexels-photo-618848.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb"}
    ];

app.get("/", function(req, res) {
    res.render("landing");    
});

app.get("/campgrounds", function(req, res) {
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");    
});

app.post("/campgrounds", function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp server is up");
});