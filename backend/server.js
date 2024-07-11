const express= require('express');
const app = express();
const cors = require('cors');
require ('dotenv').config();
require ('./config/db');
const UserController = require('./controller/UserController');
const TaskController = require('./controller/TaskController');
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use('/api/users',UserController);
app.use('/api/task',TaskController);

app.listen(PORT,()=>{
    console.log(`>>Server is running on port ${PORT}`)
})

