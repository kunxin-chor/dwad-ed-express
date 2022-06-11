const express = require('express');
const hbs = require('hbs');
const wax = require('wax-on');

const app = express();  // using a const because we don't intend app to be reassigned to
app.set('view engine', 'hbs'); // using hbs as our view engine

wax.on(hbs.handlebars);  // add template inheritance capacity to hbs
wax.setLayoutPath('./views/layouts'); // where to find layouts (layouts = common hbs file that can be shared)

// custom helpers
hbs.handlebars.registerHelper('ifEquals', function(arg1, arg2, options){
    if (arg1 == arg2) {
        // display the part before the {{else}}
        return options.fn(this);
    } else {
        // display the partr after the {{else}}
        return options.inverse(this);
    }
})

// routes here
app.get('/', function(req,res){
    res.render('home')
})

app.get('/about-us', function(req,res){
    res.render('about-us')
})

app.get('/contact-us', function(req,res){
    res.render('contact-us')
})

app.get('/products', function(req,res){
    let products = ["Organic Leather Shoes", 
                    "Organic Cotton Shirt", 
                    "Organic Cotton Socks", 
                    "Cap"];

    let discount = true;
    res.render('products',{
        'products':products,
        'discount':discount
    })
})

app.listen(3000, function(){
    console.log("server has started");
})