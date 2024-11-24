import mongoose from "mongoose";
import { Model, Schema } from "mongoose";

const lectureSchema = new mongoose.Schema({
    student_id: {
       type: Number,
       required: true,
       unique: true
    },
    student_names: {
        type: String,
        required: true
    },
    course: {
        type: String,
        enum: ['java', 'webTech', 'Mobile programming', 'web-design'],
        required: true
    },
    course_group: {
        type: String,
        enum: ['A', 'B', 'C', 'D'],
        required: true
    } 
});
const lectureModel = mongoose.model('lecture', lectureSchema);
export default lectureModel;