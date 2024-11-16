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
const handleNewUser = async (dataNewUser) => {
  console.log("dataNewUser:", dataNewUser);
  try {
    // Kiểm tra xem email đã tồn tại trong cơ sở dữ liệu chưa
    let existingUser = await dataBase.Users.findOne({
      where: { email: dataNewUser.email },
    });

    if (existingUser) {
      return {
        errcode: 2,
        errmessage: "Email đã tồn tại, vui lòng sử dụng email khác",
      };
    }

    // Băm mật khẩu và tạo người dùng mới
    let hashPasswordFrom = await hashUserPassword(dataNewUser.password);
    await dataBase.Users.create({
      email: dataNewUser.email,
      password: hashPasswordFrom,
      firstName: dataNewUser.firstname,
      lastName: dataNewUser.lastname,
      address: dataNewUser.address,
      phoneNumber: dataNewUser.phonenumber,
      gender: dataNewUser.gender == "1" ? true : false,
      RoleId: dataNewUser.roleId,
    });

    return {
      errcode: 0,
      errmessage: "Tạo tài khoản mới thành công",
    };
  } catch (error) {
    return {
      errcode: 1,
      errmessage: "Internal server error",
      error: error.message,
    };
  }
};

let hashUserPassword = async (plainPassword) => {
  //Hàm băm mật khẩu
  try {
    let salt = await bcrypt.genSalt(10); // Tạo salt
    let hashpassword = await bcrypt.hash(plainPassword, salt);
    return hashpassword;
  } catch (error) {
    throw new Error(error);
  }
}; //Hàm băm mật khẩu
const deleteUser = async (userID) => {
  try {
    // Tìm user theo ID
    let user = await dataBase.Users.findOne({
      where: { id: userID },
    });

    // Kiểm tra nếu không tìm thấy user
    if (!user) {
      return {
        errcode: 1,
        errmessage: "Không tìm thấy User",
      };
    }

    // Xóa user
    await dataBase.Users.destroy({
      where: { id: userID },
    });

    // Trả về phản hồi thành công
    return {
      errcode: 0,
      errmessage: "Xóa User thành công",
    };
  } catch (error) {
    // Bắt lỗi và trả về thông báo lỗi
    return {
      errcode: 2,
      errmessage: "Đã xảy ra lỗi trong quá trình xóa User",
      error: error.message,
    };
  }
};
const updateUser = async (dataUpdate) => {
  try {
    // Tìm user theo ID
    let user = await dataBase.Users.findOne({
      where: { id: dataUpdate.id },
    });

    // Kiểm tra nếu không tìm thấy user
    if (!user) {
      return {
        errcode: 1,
        errmessage: "Không tìm thấy User",
      };
    }

    // Thay đổi thông tin user
    await dataBase.Users.update(
      {
        email: dataUpdate.email,
        firstName: dataUpdate.firstname,
        lastName: dataUpdate.lastname,
        address: dataUpdate.address,
        phoneNumber: dataUpdate.phonenumber,
        gender: dataUpdate.gender == "1" ? true : false,
        RoleId: dataUpdate.roleId,
      },
      {
        where: { id: dataUpdate.id },
      }
    );

    // Trả về phản hồi thành công
    return {
      errcode: 0,
      errmessage: "Cập nhật thông tin thành công",
    };
  } catch (error) {
    // Bắt lỗi và trả về thông báo lỗi
    return {
      errcode: 2,
      errmessage: "Đã xảy ra lỗi trong quá trình cập nhật User",
      error: error.message,
    };
  }
};
export default {
  handleUserLogin,
  getAllUser,
  handleNewUser,
  deleteUser,
  updateUser,
};
