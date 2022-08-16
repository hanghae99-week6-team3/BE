const {User} = require("../models");

class UserRepository {
    createUser = async(userId, nickname, password) => {
        const users = await User.create({userId, nickname, password});
        return users;
    };

    findOneUser_userId = async(userId) => {
        const users = await User.findOne({where: userId});
        return users;
    };

    findOneUser_nickname = async(nickname) => {
        const users = await User.findOne({where: nickname});
        return users;
    };

    login = async(userId, password) => {
        const users = await User.findOne({where: {userId, password}});
        return users;
    };
};
module.exports = UserRepository;