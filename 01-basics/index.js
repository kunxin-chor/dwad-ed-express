// 1. include express
const express = require('express');

// 2. use the express function to crate a new app
const app = express();

// 3. define routes
// WHAT IS A ROUTE?
// a route is simply a URL on the server (sometimes
// known as path) associated with a function
app.get('/', function(req,res){
    res.send("Home page")
})

app.get('/about', function(req, res ){
    // argument 1 is the request: the information recieved by the server
    // argument 2 is the response: will be used by the server to send information/data back
    res.send("Hello world");
})

app.get('/lucky', function(req,res){
    let luckyNumber = Math.floor(Math.random() * 1000 + 1);
    res.send("<h1>Your lucky number is " + luckyNumber + "</h1>");
})


// 4. start the server
app.listen(3000, function(){
    console.log("server started");
})