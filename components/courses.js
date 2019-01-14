
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

	foundCourse = false

	for (i in courses) {
		if (courses[i].id == req.params.courseId) {
			foundCourse = true;
			res.send(courses[i]);
		}
	}

	if (!foundCourse) {
		res.send('no course with this id: ' + req.params.courseId);
	}

});

module.exports = router;