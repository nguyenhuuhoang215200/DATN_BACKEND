import bcrypt from 'bcryptjs';
import { resolveInclude } from 'ejs';
import dataBase from '../models/index'
import { where } from 'sequelize';
import { Promise } from 'sequelize';
import { response } from 'express';
var salt = bcrypt.genSaltSync(10);

let hashUserPassword = async (plainPassword) => {
    try {
        let salt = await bcrypt.genSalt(10); // Tạo salt
        let hashpassword = await bcrypt.hash(plainPassword, salt);
        return hashpassword;
    } catch (error) {
        throw new Error(error);
    }
};
const createUser = async (data) => {
    try {
        let hashPasswordFrom = await hashUserPassword(data.password);
        await dataBase.Users.create({
            email: data.email,
            password: hashPasswordFrom,
            firstName: data.firstname,
            lastName: data.lastname,
            address: data.address,
            phoneNumber: data.phonenumber,
            gender: data.gender == '1' ? true : false,
            RoleId: data.roleId,
        });
        return 'Tạo thành công';
    } catch (error) {
        console.error("Error creating user: ", error);
        throw error;
    }
};
const update_User =async (id_user,data) => {
        try {
            let hashPasswordFrom = await hashUserPassword(data.password);
            await dataBase.Users.update({
                email: data.email,
                password: hashPasswordFrom,
                firstName: data.firstname,
                lastName: data.lastname,
                address: data.address,
                phoneNumber: data.phonenumber,
                gender: data.gender == '1' ? true : false,
                RoleId: data.roleId,
            },
                {
                    where: { id: id_user }
                }

            );
            return '1';
        } catch (error) {
            throw error
        }
    }
const getAllUser = async () => {
    try {
        let danhSachNguoiDung = await dataBase.Users.findAll({
            raw: true,
        });
        return danhSachNguoiDung;
    } catch (error) {
        throw error;
    }
};

const getOneUser =async (User_id) => {
        try {
            const oneUser = await dataBase.Users.findOne({
                where: {
                    id: User_id
                }
            })
            return oneUser
        } catch (error) {
            throw error;
        }
}
const delete_User = async (User_id) => {
    try {
        let kq = await dataBase.Users.destroy({
            where: {
                id: User_id
            }
        });
        return kq; // Trả về kết quả
    } catch (error) {
        throw error; // Ném lỗi để xử lý bên ngoài
    }
}



export default {
    createUser,
    getAllUser,
    delete_User,
    getOneUser,
    update_User
}