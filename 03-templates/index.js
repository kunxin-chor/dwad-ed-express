// require express
const express = require('express');

// require hbs
const hbs = require('hbs');

// create the app
const app = express();

// instruct our app to use hbs as the view engine
app.set('view engine', 'hbs'); // make the second argument is a string

// instruct our app where to find static files
// the first argument to the express.static function
// is which folder to find the static files (i.e, images, css, style)
app.use(express.static('public'));

app.get('/', function(req,res){
    res.render('home.hbs')

})

app.get('/lucky', function(req,res){
    let luckyNumber = Math.floor(Math.random() * 1000) + 100;
    // the .hbs extension is optional
    // the second arg of render is an object
    // in that object, the keys will be variables in the HBS file
    // the value will be the value for the corresponding variable
    res.render('lucky.hbs',{
        'lucky':luckyNumber
    })
})

// start the server
app.listen(3000, function(req,res){

})