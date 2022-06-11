const express = require('express');
const hbs = require('hbs');
const wax = require('wax-on');

const app = express();
app.set('view engine', 'hbs');

// enable forms processing
// so if req.body is undefined after submitting a form
// make sure you have the following lines:
app.use(express.urlencoded({
    'extended': false  // web forms are simpler and don't need extended processing
}))

// setup the template inheritance
wax.on(hbs.handlebars);
wax.setLayoutPath('./views/layouts');

function getSelectedCheckboxes(checkboxInput) {
     let result = null;
    if(checkboxInput) {
        if (Array.isArray(checkboxInput)) {
            result = checkboxInput;
        } else {
            // if we reach there we are sure that req.body.tags is a string
            result = [ checkboxInput ]
        }
    } else {
        result = [];
    }
    return result;
}

app.get('/', function(req,res){
    res.render('home')
})

app.get('/add-food', function(req,res){
    res.render('add-food')
})

app.post('/add-food', function(req,res){
    // retrieve the selected checkboxes from the form
    // there are three cases:
    // 1. if 2 or more checkboxes are selected, store it as an array
    // 2. if only 1 checkbox is selected, store it as an array with that one checkbox's value inside
    // 3. if no checkboxes is selected, store it as an empty array
    let result = getSelectedCheckboxes(req.body.tags);
    // if(req.body.tags) {
    //     if (Array.isArray(req.body.tags)) {
    //         result = req.body.tags;
    //     } else {
    //         // if we reach there we are sure that req.body.tags is a string
    //         result = [ req.body.tags ]
    //     }
    // } else {
    //     result = [];
    // }

    console.log(req.body)
    console.log("selected checkboxes =", result);
    res.render('summary.hbs', {
        'foodName': req.body.foodName,
        'calories': req.body.calories,
        'meal': req.body.meal,
        'tags': result
    });
})

app.listen(3000, function(){
    console.log("Server has started")
})