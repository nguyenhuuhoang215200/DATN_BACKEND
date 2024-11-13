const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('healcare_database', 'root', null, {
    host: 'localhost',
    dialect: 'mysql'
  });

  let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Kết nối DataBase thành công.');
      } catch (error) {
        console.error('Không thể kết nối với cơ sở dữ liệu:', error);
      }
  }

 module.exports = connectDB;