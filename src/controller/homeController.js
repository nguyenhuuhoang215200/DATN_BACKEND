import { DATE } from 'sequelize';
import DB from '../models/index';
import { json } from 'body-parser';

let getHomePage = async (req, res) => {
  try {
    let data = await DB.User.findAll();
    console.log('------------------------------');
    console.log(data);
    console.log('------------------------------');
    
    res.render('HomePage.ejs',{
      data : JSON.stringify(data)
    });  // Chú ý sửa tên file template nếu cần thiết
  } catch (error) {
    console.log(error);
  }
};

export default {
  getHomePage
};
