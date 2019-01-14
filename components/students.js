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

router.get('/:userId', (req, res) => {

	foundUser = false

    for (i in students) {
        if (students[i].id == req.params.userId) {
			foundUser = true;
			res.send(students[i]);
        };
    };

	if (!foundUser) {
		res.send('No user with id ' + req.params.userId);
	}

});

//write
router.post('/', (req, res) => {

	idAlreadyExists = false;

	//read data from req
	console.log(req.body);
	
    for (i in students) {
        if (students[i].id == req.query.id) {
			idAlreadyExists = true;
		}
	}

    if (idAlreadyExists) {
		res.send('Student with this ID already exists.')
    } else {
		//append user data to users array
		students.push(req.body);
		res.send('OK');
    }

});

//delete
router.delete('/:userId',(req,res) => {

	let filtered = students.filter(function(student) {
		return student.id != req.params.userId;
	});

	console.log(students);
	students = filtered;
	console.log(students);
	res.send('ok');

});

//update
router.put('/:userId',(req,res) => {

	let foundStudent = false;

	for (i in students) {
		console.log(students[i]);
		
		if (students[i].id == req.params.userId) {

			foundStudent = true;

			let updateName = req.query.name;
			let updateAdress = req.query.adress;
			let updateClass = req.query.class;

			if (updateName != null) {
				students[i].name = updateName;
			};
			if (updateAdress != null) {
				students[i].adress = updateAdress;
			};
			if (updateClass != null) {
				students[i].class = updateClass;
			};

		};
	};

	if (foundStudent) {
		res.send('ok');
	} else {
		res.send('no student with id: ' + req.params.userId);
	};

});

module.exports = router;