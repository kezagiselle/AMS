import lectureModel from "../models/lecture.js";
import BadRequestError from "../Errors/BadRequest.js";
import NotFoundError from "../Errors/NotFoundError.js";
import { validationResult } from "express-validator";
import asyncWrapper from "../middleware/async.js";

const addStudent = asyncWrapper(async (req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(new BadRequestError(errors.array()[0].msg));
    }
    const newStudent = await lectureModel.create(req.body);
    return res.status(201).json(newStudent);
});

const getById = asyncWrapper(async (req, res, next) =>{
    const studentId = req.params.id;
    const foundStudent = await lectureModel.findById(studentId);
    if(!foundStudent){
        return next(new NotFoundError('student not found'));
    }
    res.status(201).json(foundStudent);
});

const updateStudent = asyncWrapper(async (req, res, next) =>{
    const studentId = req.params.id;
    const updates = req.body;
    const updatedStudent = await expenseModel.findByIdAndUpdateStudent(studentId, updates, {new: true});
    if(!updatedStudent){
        return next(new NotFoundError('student not found'));
    }
    res.status(201).json(updatedStudent);
});

const getAllStudents = asyncWrapper(async (req, res, next) =>{
    const expenses = await lectureModel.find({})
    if(expenses){
        return res.status(201).json({
            nbHits: expenses.length,
            expenses
        })
    }
});

const findByCourse = asyncWrapper(async (req, res, next) =>{
    const courseName = req.params.name;
    const foundStudents = await lectureModel.find(courseName);
    if(!foundStudents){
        return next(new NotFoundError('No students found for this course'));
    };
});

const deleteStudent = asyncWrapper(async (req, res, next) =>{
    const studentId = req.params.id;
    const deletedStudent = await lectureModel.findByIdAndDelete(studentId);
    if(!deletedStudent){
        return next(new NotFoundError('student not found'));
    }
    res.status(201).json({message: 'Student deleted successfully', deletedStudent});
});

const lectureControllers = {
    addStudent,
    getById,
    updateStudent,
    getAllStudents,
    findByCourse,
    deleteStudent
};
export default lectureControllers;