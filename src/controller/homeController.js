import { DATE } from 'sequelize';
import DB from '../models/index';
import { json } from 'body-parser';
import CRUDService from '../service/CRUDService';

// Định nghĩa hàm getHomePage
let getHomePage = async (req, res) => {
  res.render('index.ejs'); // Giả sử bạn có một tệp index.ejs để hiển thị trang chủ
};

let getCRUD = async (req, res) => {
  return res.render('./test/crud.ejs');
};
let postCRUD = async (req, res) => {
  let message = await CRUDService.createUser(req.body);
  console.log(message);
  res.redirect('/readCRUD');
};
let getDataCrud = async (req, res) => {
  let data = await CRUDService.getAllUser()
  return res.render('./test/getDataCrud.ejs', {
    dataUser: data
  })
};

let getDeleteUser = async (req, res) => {
      let dataOneUser = await CRUDService.getOneUser(req.params.id)
      return res.render('./test/deleteUser.ejs',{
        dataUser: dataOneUser
      });
};
let postDeleteUser = async (req, res) =>{
  await CRUDService.delete_User(req.params.id);
  res.redirect('/readCRUD');
}
let updateUser = async (req, res) => {
  let dataOneUser = await CRUDService.getOneUser(req.params.id)
  return res.render('./test/updateCRUD.ejs',{
    dataUser: dataOneUser
  })
};
let PostupdateUser = async( req, res) =>{
  CRUDService.update_User(req.params.id,req.body)
  console.log('------------------------------------------------')
  console.log(req.params.id)
  console.log('------------------------------------------------')
  console.log(req.body)
  console.log('------------------------------------------------')
  res.redirect('/readCRUD');
}
export default {
  getHomePage,
  getCRUD,
  postCRUD,
  getDataCrud,
  updateUser,
  getDeleteUser,
  postDeleteUser,
  PostupdateUser
};
