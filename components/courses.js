
const express = require('express');
let router = express.Router();

let courses = [

    {
        name: "1st course",
        description: "random description",
        id: 1
		},
    {
		name: "second course",
		description: "another random description",
		id: 2
    }

    ];

//read
router.get('/',(req,res) => res.send(courses));

router.get('/:courseId', (req,res) => {

	let foundedCourse = alreadyExists(req.params.courseId);
	let index = getIndex(req.params.courseId);

	if (foundedCourse) {
		res.send(courses[index]);
	} else {
		res.send('no course with this id: ' + req.params.courseId);
	}

});

//write 
router.post('/',(req, res) => {

	let foundedCourse = alreadyExists(req.body.id);

	if (foundedCourse) {
		res.send('Course with this id already exists.')
	} else {
		courses.push(req.body);
		res.send('Course added.');
	}

});

//delete
router.delete('/:courseId',(req, res) => {

	let foundedCourse = alreadyExists(req.params.courseId);

	if (foundedCourse) {
		let filtered = courses.filter(function(course) {
			return course.id != req.params.courseId;
		});
		courses = filtered;
		res.send('Course deleted.');
	} else {
		res.send('No course with id ' + req.params.courseId);
	}
});

//update
router.put('/:courseId',(req, res) => {

	let foundedCourse = alreadyExists(req.params.courseId);
	let index = getIndex(req.params.courseId);
	if (foundedCourse) {
		let updateName = req.query.name;
		let updateDescription = req.query.description;

        if (updateName != null) {
			courses[index].name = updateName;
		}
        if (updateDescription != null) {
			courses[index].description = updateDescription;
		}
		res.send('Course updated.');
    } else {
		res.send('No course with id ' + req.params.courseId);
    }

});

function alreadyExists(id) {
    for (i in courses) {
        if (courses[i].id == id) {
			return true;
        }
	}
	return false;
}

function getIndex(id) {
    for (i in courses) {
        if (courses[i].id == id) {
			return i;
        }
    }
}


module.exports = router;