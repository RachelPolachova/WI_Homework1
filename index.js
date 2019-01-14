// HOMEWORK

const express = require('express')
const app = express();
const bodyParser = require('body-parser'); 
const port = 3000
const students = require('./components/students');
const courses = require('./components/courses');


app.use(bodyParser.json());

app.use('/students',students);
app.use('/courses',courses);


app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))