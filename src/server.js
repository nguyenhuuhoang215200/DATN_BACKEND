import express from 'express';
import bodyParser from 'body-parser';//thu vien ho tro lay tham so tu nguoi dung
import viewEngine from './config/ViewEngine';
import initWebroute from './route/web'
import connectDB from './config/DataConnect'
import cors from 'cors'
require('dotenv').config();
let app = express();


app.use(cors({ credentials: true, origin: true }));
// config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
viewEngine(app);
initWebroute(app);

connectDB();
// truy cập file static
app.use(express.static('./src/public'));
let PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
    //callback
    console.log('backend Node Js is runing on the port localhost:' + PORT)
})
