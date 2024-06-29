import express from "express";
let configViewEgine = (app) =>{
    app.use(express.static("/src/public"))//thư mục đc chia sẻ
    app.set("view engine","ejs");
    app.set("views","./src/views");
}
module.exports = configViewEgine