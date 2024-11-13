import express from "express";
import homeController from '../controller/homeController'
import UserController from '../controller/UserController'
let route = express.Router();

let initWebroutes = (app) => {
    route.get('/', homeController.getDataCrud)
    route.get('/createCRUD', homeController.getCRUD)
    route.post('/post-crud', homeController.postCRUD)
    route.get('/readCRUD', homeController.getDataCrud)
    route.get('/deleteUser/:id', homeController.getDeleteUser)
    route.post('/delete/:id', homeController.postDeleteUser)
    route.get('/updateUser/:id', homeController.updateUser)
    route.post('/postUpdateCRUD/:id', homeController.PostupdateUser)

    route.post('/api/login',UserController.handleLogin)
    return app.use("/", route);
}
module.exports = initWebroutes 