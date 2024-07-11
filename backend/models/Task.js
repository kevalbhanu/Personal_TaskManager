const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    deadline:{
        type:Date,
        required:true
    },
    priority:{
        type:String,
        required:true
    }
});

const Task = mongoose.model('tasks',TaskSchema);
module.exports=Task;