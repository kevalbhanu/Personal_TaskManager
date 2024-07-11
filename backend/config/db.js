const mongoose = require('mongoose');
const DB_URL = process.env.DB_URL;
mongoose.connect(DB_URL);
const db = mongoose.connection;

db.on('connected',()=>{
    console.log('Mongodb connected');
});

db.on('error',(err)=>{
    console.log('Mongodb error',err);
})