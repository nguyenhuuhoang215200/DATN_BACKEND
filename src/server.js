import express from 'express';
import bodyParser from 'body-parser';//thu vien ho tro lay tham so tu nguoi dung
import viewEngine from './config/ViewEngine';
import initWebroute from './route/web'
import connectDB from './config/DataConnect'
require('dotenv').config();
let app = express();

// config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
viewEngine(app);
initWebroute(app);

connectDB();

let PORT = process.env.PORT || 3030;

app.listen(PORT, ()=>{
    //callback
    console.log('backend Node Js is runing on the port :' + PORT)
})
