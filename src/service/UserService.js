import bcrypt from "bcryptjs";
import dataBase from "../models/index";

const handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let UserData = {};

      // Kiểm tra xem email có tồn tại trong hệ thống không
      let isExist = await checkUserEmail(email);

      if (isExist) {
        // Tìm người dùng theo email
        let user = await dataBase.Users.findOne({
          attributes: ["id", "email", "password"], // Chỉ lấy các thuộc tính cần thiết
          where: { email: email },
          raw: true,
        });

        if (user) {
          // Debug: In ra giá trị mật khẩu đã băm và mật khẩu nhập vào
          console.log("Stored password hash:", user.password);
          console.log("Input password:", password);

          // So sánh mật khẩu nhập vào với mật khẩu đã băm trong cơ sở dữ liệu
          let check = bcrypt.compareSync(password, user.password);
          if (check) {
            UserData.error = 0;
            UserData.errmessage = "Đăng nhập thành công";
            delete user.password; // Xóa mật khẩu trước khi trả về thông tin
            UserData.user = user; // Gán thông tin người dùng vào UserData
          } else {
            UserData.error = 3;
            UserData.errmessage = "Mật khẩu không đúng";
          }
        } else {
          UserData.error = 2;
          UserData.errmessage = "Người dùng không tồn tại trong hệ thống";
        }
      } else {
        UserData.error = 1;
        UserData.errmessage = "Email không có trong hệ thống";
      }

      // Debug: In ra thông tin UserData sau khi xử lý
      console.log("UserData:", UserData);
      resolve(UserData);
    } catch (error) {
      reject(error);
    }
  });
};

// Hàm kiểm tra email có tồn tại trong cơ sở dữ liệu hay không
const checkUserEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await dataBase.Users.findOne({
        where: { email: email },
      });

      if (user) resolve(true);
      else resolve(false);
    } catch (error) {
      reject(error);
    }
  });
};
// Hàm lấy thông tin user all hoặc 1
const getAllUser = async (userID) => {
  try {
    if (userID === "ALL") {
      return await dataBase.Users.findAll({
        raw: true,
        attributes: { exclude: ["password"] }, // Loại bỏ trường password
      });
    } else if (userID && userID !== "ALL") {
      return await dataBase.Users.findOne({
        raw: true,
        attributes: { exclude: ["password"] }, // Loại bỏ trường password
        where: { id: userID },
      });
    }
  } catch (error) {
    throw error; // Đảm bảo lỗi được xử lý
  }
};

export default {
  handleUserLogin,
  getAllUser,
};
