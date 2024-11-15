import UserService from "../service/UserService";
const handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  console.log(email, "và", password);
  if (!email || !password) {
    return res.status(500).json({
      errcode: 1,
      message: "Missing inputs parameter",
    });
  }
  let UserData = await UserService.handleUserLogin(email, password);
  return res.status(200).json({
    errcode: UserData.error,
    message: UserData.errmessage,
    user: UserData.user ? UserData.user : {},
  });
};
const handleGetAllUser = async (req, res) => {
  try {
    // Gọi service để lấy danh sách người dùng
    let UserID = req.query.id;
    console.log(UserID);
    if (!UserID) {
      return res.status(200).json({
        errcode: 1,
        errmessage: "ID rỗng",
        users: [],
      });
    }
    // Trả về phản hồi thành công với dữ liệu người dùng
    else {
      const users = await UserService.getAllUser(UserID);
      res.status(200).json({
        errcode: 0,
        errmessage: "ok",
        users,
      });
    }
  } catch (error) {
    // Xử lý và trả về lỗi nếu có vấn đề xảy ra
    return res.status(500).json({
      errcode: 1,
      errmessage: "Internal server error",
      error: error.message,
    });
  }
};
export default {
  handleLogin,
  handleGetAllUser,
};
