var express = require('express')
var app = express()
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST,DELETE,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

let student = [];

/**Get the subject list to fill combobox*/
app.get('/api/getSubjectType', function (req, res) {
  res.json([
    {
      id: 1,
      type: 'English'
    },
    {
      id: 2,
      type: 'Maths'
    },
    {
      id: 3,
      type: 'Science'
    },
    {
      id: 4,
      type: 'History'
    },
    {
      id: 5,
      type: 'Geography'
    }
  ])
})

/** Post the data for students */
app.post('/api/addStudent', function (req, res) {
  let studentObject = {
    studentName: req.body.studentDetail.studentName,
    studentAddress: req.body.studentDetail.studentAddress,
    studentExamDate: req.body.studentDetail.studentExamDate,
    studentSubject: req.body.studentDetail.studentSubject,
    studentMarks: req.body.studentDetail.studentMarks
  }
  student.unshift(studentObject);
  res.json(`${student.length} sucessfully added`);
})

/**Get the student list */
app.get('/api/getStudents', function (req, res) {
  res.json(student);
})

/**Delete student */
app.delete('/api/deleteStudent/:studentName', function (req, res) {
  let i = 0;
  let j = 0;
  let studentTemp = [];
  for (i in student) {
    if (student[i].studentName != req.params.studentName) {
      studentTemp[j] = student[i];
      j=j+1;
    }
  }
  student = studentTemp;
  console.log("---------");
  console.log(studentTemp);
  console.log("-----............----");
  console.log(student);
  res.json(`${req.params.studentName} deleted sucessfully `);
})

app.listen(3001, function () {
  console.log('App listening on port 3001!')
})