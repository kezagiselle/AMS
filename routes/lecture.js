import lectureControllers from "../controllers/lecture.js";
import express from 'express';
const lectureRouter = express.Router();

lectureRouter.post('/add', lectureControllers.addStudent);
lectureRouter.get('/getById/:id', lectureControllers.getById);
lectureRouter.get('/getAll', lectureControllers.getAllStudents);
lectureRouter.get('/findByCourse/:name', lectureControllers.findByCourse);
lectureRouter.put('/update/:id', lectureControllers.updateStudent);
lectureRouter.delete('/delete', lectureControllers.deleteStudent);

export default lectureRouter;