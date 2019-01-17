##Usage

###Students
[GET] all students:
/students
[GET] current student:
/students/{studentId}

[POST] student:
example of JSON in body:
{
	"name": "New name",
	"adress": "New adress",
	"class": "New class",
	"id": 9
}

[PUT] student:
/students/{studentId}?name={newname}&adress={newadress}
(not all parameters required.)

[DELETE] student:
/students/{studentId}

###Courses
Same as students

###Grades
[GET] same as students
[POST] same as students
[PUT] Update students in current course:
/grades/{courseId} and JSON in body
example: {
	"students": [
			{
				"studentId": 4,
				"grade": 8
			},
			{
				"studentId": 1,
				"grade": 9
			}
		]
}
[DELETE] Whole course:
/grades/{courseId}

[DELETE] Current student from course:
/grades?courseId={courseId}&studentId={studentId}



