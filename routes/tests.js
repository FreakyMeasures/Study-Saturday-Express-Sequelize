const router = require("express").Router();
const Test = require("../db/models/test");
const Student = require("../db/models/student");

// MOUNTED ON /tests

//retrieves all tests
router.get("/", async (req, res, next) => {
  try {
    //finding all tests
    const tests = await Test.findAll();
    res.send(tests);
  } catch (err) {
    next(err);
  }
});

//gets the test instance by id
router.get("/:id", async (req, res, next) => {
  try {
    //first we fine the specfic test per the id in params
    let test = await Test.findByPk(req.params.id);
    //next we are saying if we find this test res.send it
    if (test) {
      res.send(test);
    } else {
      //OR if we dont we give status 404 and errors message "test not found"
      res.status(404).send("Test not found");
    }
  } catch (err) {
    next(err);
  }
});

//POST /tests/student/:studentId"
router.post("/student/:studentId", async (req, res, next) => {
  try {
    //first we find the student
    let student = await Student.findByPk(req.params.studentId);
    //next - creates a new Test instance for a student
    let test = await Test.create(req.body);
    //WILL NEED MAGIC METHODS HERE
    console.log("test Magic Methods", Object.keys(test.__proto__));
    //this is assigning the test we just created to that specific student
    //utilizing a magic method or setStudent
    let studentTest = await test.setStudent(student);
    res.status(201).send(studentTest);
  } catch (err) {
    next(err);
  }
});

//DELETE /tests/:id"
//"deletes an instance of test by its id"
router.delete("/:id", async (req, res, next) => {
  try {
    //deletes an instance of test by its id"
    await Test.destroy({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
