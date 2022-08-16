const UserService = require("../services/user.services");
const jwt = require("jsonwebtoken");
const res = require("express/lib/response");
require("dotenv").config();

class UsersController {
    userService = new UserService();

    createUser = async(req,res,next) => {
        const {userId, nickname, password} = req.body;

        await this.userService.createUser({userId, nickname, password});
        res.status(200).json({
            success: true,
            message: "User create success!"
        });
    };

    Login = async() => {
        const {userId, password} = req.body;
        const user = await this.userService.Login(userId, password);

        if(!user){
            res.status(400).json({
                success: false, 
                errorMessage: "ID or Password is worng",
            });
            return;
        };

        let payload = {userId: user.userId, nickname: nickname};
        const token = jwt.sign(payload, process.env.MYSQL_KEY);
        res.cookie("token", token);

        res.json({
            success: true,
            message: "login success"
        })
    };

    DoubleCheck = async() => {
        const {key, value} = req.body;
        let user = "";
        if(key == "userId"){
            user = await this.userService.findOneUser_userId({value});
        }
        if(key == "nickname"){
            user = await this.userService.findOneUser_nickname({value});
        }
        if(!user){
            return res.status(400).json({ok: false});
        }
       return res.status(200).json({ok: true});
    }
};
module.exports = UsersController;