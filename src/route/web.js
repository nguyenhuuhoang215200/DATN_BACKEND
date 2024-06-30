import express from "express";
import homeController from '../controller/homeController'
let route = express.Router();

let initWebroutes = (app) => {
    route.get('/',(req,res) => {
        return res.send("hELLO");
    })
    route.get('/test',homeController.getHomePage)
 return app.use("/",route);
}
module.exports = initWebroutes