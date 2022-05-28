const express = require('express');
const {
    addObject,
    getAll,
    getByID,
    deleteObject,
    updateObject
} = require('./databaseHandler');
const app = express();
const path = require('path');
const fs = require('fs');
const cors = require('cors');
var bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));

app.get('/', async (req, res) => {
    const users = await getAll('Users');
    res.json(users);
});

app.get('/:id', async (req, res) => {
    const id = req.params.id;
    const user = await getByID('Users', id);
    res.json(user);
});

app.post('/edit/:id', async (req, res) => {
    const updateValues = {
        $set: {
            name: req.body.name,
            age: req.body.age,
            position: req.body.position,
        }
    }
    const objectToUpdate = await getByID('Users', req.params.id);
    await updateObject('Users', objectToUpdate, updateValues);
});

app.get('/add', async (req, res) => {
    console.log('Hello world');
});

app.post('/add', async (req, res) => {
    const objectToInsert = {
        name: req.body.name,
        age: req.body.age,
        position: req.body.position,
    }
    await addObject('Users', objectToInsert);
});

app.get('/delete/:id', async (req, res) => {
    await deleteObject('Users', req.params.id);
    console.log('User deleted!');
})

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));