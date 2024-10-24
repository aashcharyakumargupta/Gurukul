const mongoose = require("mongoose")

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "Teacher"
    },
    teachSubject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subject'
    },
    teachSclass: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sclass'
    },
    attendance: [{
        date: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            enum: ['Present', 'Absent'],
            required: true
        }
    }]
}, { timestamps: true });

module.exports = mongoose.model("teacher", teacherSchema)