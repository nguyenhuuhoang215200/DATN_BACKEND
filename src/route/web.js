import express from "express";
let route = express.Router();

let initWebroutes = (app) => {
    route.get('/',(req,res) => {
        return res.send("hELLO");
    })
 return app.use("/",route);
}
module.exports = initWebroutes