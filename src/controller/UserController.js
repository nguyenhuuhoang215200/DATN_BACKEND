import UserService from "../service/UserService";
const handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    console.log (email,'và' ,password);
    if (!email || !password) {
        return res.status(500).json({
            errcode: 1,
            message: 'Missing inputs parameter'
        })
    }
    let UserData = await UserService.handleUserLogin(email, password);
    return res.status(200).json({
        errcode: UserData.error,
        message: UserData.errmessage,
        user : UserData.user ? UserData.user :{}
    });
}

export default {
    handleLogin
}