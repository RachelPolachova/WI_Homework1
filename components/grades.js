const express = require('express');
let router = express.Router();

let grades = [
	{
		courseId: 1,
		students: [
			{
				studentId: 1,
				grade: 1
			},
			{
				studentId: 2,
				grade: 1
			}
		]
	},
	{
		courseId: 2,
		students: [
			{
				studentId: 1,
				grade: 3
			},
			{
				studentId: 9,
				grade: 5
			}
		]
	}
];

//read --tested--

router.get('/', (req, res) => res.send(grades));
router.get('/:courseId', (req, res) => {
	let id = req.params.courseId;
	let courseExists = exists(id);
	let index = getIndex(id);

	if (courseExists) {
		res.send(grades[index]);
	} else {
		res.send('No course with id ' + id);
	}
});

//write --tested--
router.post('/', (req,res) => {
	let courseId = req.body.courseId;
	let courseExists = exists(courseId);
	let index = getIndex(courseId);
	let studentHasGrade = false;

	if (courseExists) {
		// let existingStudentsIDs = getStudentIds(grades[index].students);
		// let newStudentsIDs = getStudentIds(req.body.students);
		//
		// for (i in newStudentsIDs) {
		// 	for (j in existingStudentsIDs) {
		// 		if (newStudentsIDs[i] == existingStudentsIDs[j]) {
		// 			studentHasGrade = true
		// 			// console.log('student has grade.' + i + j);
		// 		}
		// 	}
		// 	if (!studentHasGrade) {
		// 		// console.log('student' + newStudentsIDs[i] + 'doesnt have grade yet.')
		// 		grades[index].students.push(req.body.students[i]);
		// 	}
		// 	studentHasGrade = false;
		// }
		// res.send('Grades added.');
		res.send('Course already exists.');
	} else {
		grades.push(req.body);
		res.send('Course created.');
	}

});

//delte current student from current course in grade JSON
router.delete('/', (req,res) => {

	let courseId = req.query.courseId;
	let studentId = req.query.studentId;
	console.log("id: " + courseId + "id stud: " + studentId);
	let courseExists = exists(courseId);

	let index = getIndex(courseId);

	if (courseExists) {
		let studExists = studentExists(studentId, courseId);
		let studentsIndex = getStudentIndex(studentId, grades[index].students);
		if (studExists) {
			grades[index].students.splice(studentsIndex,1);
			res.send('deleted.');
		} else {
			res.send('student does not exists.');
		}
	} else {
		res.send('course does not exists.');
	}

});

//delete whole course from grade JSON
router.delete('/:courseId', (req,res) => {
	let courseId = req.params.courseId;
	let courseExists = exists(courseId);

	if (courseExists) {
		let filtered = grades.filter(function(course) {
			return course.courseId != courseId;
		});
		grades = filtered;
		res.send("Course deleted from grades.");
	} else {
		res.send('No course with id ' + courseId);
	}
});

//update

router.put('/:courseId', (req,res) => {
	let courseId = req.params.courseId;
	let courseExists = exists(courseId);
	let index = getIndex(courseId);
	let studentHasGrade = false;

	if (courseExists) {
		let existingStudentsIDs = getStudentIds(grades[index].students);
		let newStudentsIDs = getStudentIds(req.body.students);

		for (i in newStudentsIDs) {
			for (j in existingStudentsIDs) {
				if (newStudentsIDs[i] == existingStudentsIDs[j]) {
					grades[index].students[j].grade = req.body.students[i].grade;
					studentHasGrade = true
					res.send('Grade updated.');
				}
			}
			if (!studentHasGrade) {
				grades[index].students.push(req.body.students[i]);
				res.send('Student added.');
			}
			studentHasGrade = false;
		}
	} else {
		res.send('Course does not exist.');
	}

});

function exists(id) {
	for (i in grades) {
		if (grades[i].courseId == id) {
			return true
		}
	}
	return false;
}

function studentExists(studentId, courseId) {

	let courseIndex = getIndex(courseId);
	let students = grades[courseIndex].students
	for (i in students) {
		if (studentId == students[i].studentId) {
			return true;
		}
	}

}

function getIndex(id) {
	for (i in grades) {
		if (grades[i].courseId == id) {
			return i
		}
	}
}

function getStudentIds(students) {
	let IDs = [];
	for (i in students) {
		IDs.push(students[i].studentId);
	}
	return IDs;
}

function getStudentIndex(id, students) {
	for (i in students) {
		if (students[i].studentId == id) {
			return i;
		}
	}
}

module.exports = router;

//JSON in JSON?
