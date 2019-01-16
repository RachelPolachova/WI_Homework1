const express = require('express');
let router = express.Router();

let students = [

    {
		name: "1st student",
		adress: "My adress",
		class: "abrakadabra",
		id: 1
        }

    ];

//read
router.get('/',(req, res) => res.send(students));

router.get('/:studentId', (req, res) => {

	let id = req.params.studentId;
	let studentFounded = alreadyExists(id);
	let index = getIndex(id);

    if (studentFounded) {
		res.send(students[index]);
    } else {
		res.send('No student with id ' + id);
    }

});

//write
//sending id via JSON not via url in postman, so I have to use req.body.id not params
router.post('/', (req, res) => {

	let id = req.body.id;
	let studentFounded = alreadyExists(id);

    if (studentFounded) {
		res.send('Student already exists with id ' + id);
    } else {
		students.push(req.body);
		res.send('Student added.');
    }

});

//delete
router.delete('/:studentId',(req,res) => {

	let id = req.params.studentId;
	let studentFounded = alreadyExists(id);

	if (studentFounded) {

		let filtered = students.filter(function(student) {
			return student.id != id;
		});

		students = filtered;
		res.send('Student deleted.');

	} else {
		res.send('No student with id ' + id);
	}

});

//update -> passing data via url
router.put('/:studentId',(req,res) => {

	let id = req.params.studentId;
	let studentFounded = alreadyExists(id);
	let index = getIndex(id);

	if (studentFounded) {

		let updateName = req.query.name;
		let updateAdress = req.query.adress;
		let updateClass = req.query.class;

		if (updateName != null) {
			students[index].name = updateName;
		};
		if (updateAdress != null) {
			students[index].adress = updateAdress;
		};
		if (updateClass != null) {	
			students[index].class = updateClass;
		};

		res.send('Student updated.')

    } else {
		res.send('No student with id ' + id);
	}

});

function alreadyExists(id) {
    for (i in students) {
        if (students[i].id == id) {
			return true;
        }
	}
	return false;
}

function getIndex(id) {
    for (i in students) {
        if (students[i].id == id) {
			return i;
        }
    }
}

module.exports = router;