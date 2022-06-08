// require express
const express = require('express');

// create the express application
const app = express();

app.get('/', function(req,res){
    res.send("Hello 123")
})

// In express, URL can have parameters
// so parameters are somewhat like the arguments that we can pass to function (they are like placeholders)
// the url parameters always begin with a :
app.get('/hello/:firstname', function(req,res){
    // to extract the value of a url parameter, we use req.params
    console.log(req.params);
    let name = req.params.firstname;
    res.send("Hello " + name);
})

app.get('/greetings/:firstname/:lastname', function(req, res){
    console.log(req.params);
    let fname = req.params.firstname;
    let lname = req.params.lastname;
    res.send(`<h1>Hello ${fname} ${lname}!!</h1>`)

})

// start the server
app.listen(3000, function(){
    console.log("server has started");
})