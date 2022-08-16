const userRepository = require("../repositories/user.repository");

class UserService {
    userRepository = new userRepository();

    createUser = async(userId, nickname, password) => {
        const createUserData = await this.userRepository.createUser(userId, nickname, password);
        return{
            Id: createUserData.Id,
            userId: createUserData.userId,
            nickname: createUserData.nickname,
            password: createUserData.password,
            createAt: createUserData.createAt,
            updatedAt: createUserData.updatedAt,
        };
    };

    findOneUser_userId = async(userId) => {
        const findUser = await this.userRepository.findOneUser_userId(userId);

        return{
            nickname: findUser.nickname
        };
    };

    findOneUser_nickname = async(nickname) => {
        const findUser = await this.userRepository.findOneUser_nickname(nickname);

        return{
            nickname: findUser.nickname
        };
    };

    Login = async(userId, password) => {
        const UserData = await this.userRepository.login(userId, password);
        return{
            userId: UserData.userId,
            password: UserData.password,
        };
    };
};
module.exports = UserService;