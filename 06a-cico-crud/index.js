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

// require in 188 handlebar helpers
require('handlebars-helpers')({
  handlebars: hbs.handlebars
});

// the global array foodRecords store all the food entries that the user has typed in
// using the array as a data store is temporary
// when the server restarts (i.e nodemon restarrts thte server) all data will be gone
let foodRecords = [
    {
        "id": Math.floor(Math.random() * 10000) + 1,
        "foodName": "Chicken Rice",
        "calories": 500,
        "meal":"lunch",
        "tags":["organic","less-oil"]
    },
    {
        "id": Math.floor(Math.random() * 10000) +1,
        "foodName": "Boston Clam Chowder",
        "calories": 750,
        "meal": "dinner",
        "tags": ["home-cooked"]
    },
    {
        "id": Math.floor(Math.random() * 10000) +1,
        "foodName": "Tuna Sandwich",
        "calories": 600,
        "meal": "snack",
        "tags": ["glutten-free"]
    }
];

function getAllFoodRecords() {
    return foodRecords;
}

function addFoodRecord(newFoodRecord) {
    foodRecords.push(newFoodRecord);
}

function getFoodRecordByID(foodRecordID){
    let wantedFoodRecord = null;  // state variable: to store or rerepresent some facts about an algo
    for (let eachRecord of foodRecords) {
        if (foodRecordID == eachRecord.id) {
            wantedFoodRecord = eachRecord;
            break;
        }
    }
    return wantedFoodRecord;
}

function getFoodRecordIndex(foodRecordID) {
    let indexOfFoodRecord = null;
    for (let i=0; i < foodRecords.length; i++) {
        const eachRecord = foodRecords[i];
        if (eachRecord.id == foodRecordID) {
            indexOfFoodRecord = i;
            break;
        }
    }
    return indexOfFoodRecord;
}

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

// "R" - read data from the database
app.get('/', function(req,res){
    // essentially fetch all the records in the database
    // and display them
    let allFoodRecords = getAllFoodRecords();
    res.render('all-food.hbs', {
        'allFood': allFoodRecords
    })
})

app.get('/add-food', function(req,res){
    res.render('add-food')
})

app.post('/add-food', function(req,res){
    let result = getSelectedCheckboxes(req.body.tags);

    let newFoodRecord = {
        'id': Math.floor(Math.random() * 10000 + 1),
        'foodName': req.body.foodName,
        'calories': req.body.calories,
        'meal': req.body.meal,
        'tags': result
    }

    // add to our database
    addFoodRecord(newFoodRecord);

    res.render('summary.hbs', {
        'foodName': req.body.foodName,
        'calories': req.body.calories,
        'meal': req.body.meal,
        'tags': result
    });
})

app.get('/update-food/:food_record_id', function(req,res){
    let foodRecordID = req.params.food_record_id;
    // retrieve the food record that being edited
    let wantedFoodRecord = getFoodRecordByID(foodRecordID)
    res.render('update-food.hbs',{
        'foodRecord' : wantedFoodRecord
    })
})

app.post('/update-food/:food_record_id', function(req,res){
    let updatedFoodRecord = {
        'id': req.params.food_record_id,
        'foodName': req.body.foodName,
        'calories': req.body.calories,
        'meal':req.body.meal,
        'tags': getSelectedCheckboxes(req.body.tags)
    }

    // find the index of the food record in our database
    // which id matches the one that we are trying to edit.
    let indexOfFoodRecord = getFoodRecordIndex(req.params.food_record_id);

    foodRecords[indexOfFoodRecord] = updatedFoodRecord;
    res.redirect('/')

})

app.get('/delete-food/:food_record_id', function(req,res){
    let foodRecordToDelete = getFoodRecordByID(req.params.food_record_id);
    res.render('delete-food', {
        'foodRecord': foodRecordToDelete
    })
})

app.post('/delete-food/:food_record_id',function(req,res){
    let indexToDelete = getFoodRecordIndex(req.params.food_record_id);
    // splice will mutate (i.e change) the array it is called on
    // splice will delete from the first argument onwards and delete
    // a number of items equal to the second argument
    foodRecords.splice(indexToDelete, 1);
    res.redirect('/')
})

app.listen(3000, function(){
    console.log("Server has started")
})