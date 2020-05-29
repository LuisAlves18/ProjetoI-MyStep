import UserModel from '../model/UserModel.js'

export default class UserController {
    constructor() {
        this.userModel = new UserModel();
    }

    createUser(username, fullname, password, email, birth, admin) {
        if (!this.userModel.getAll().some(user => user.username === username)) {
            this.userModel.create(username, fullname, password, email, birth, admin);
        } else {
            throw Error(`User with username "${username}" already exists!`);
        }
    }

    loginUser(loginUsername, loginPassword) {
        if (this.userModel.getAll().some(user => {return user.username === loginUsername && user.password === loginPassword })) {
            this.userModel.login(loginUsername);
            return true;
        } else {
            throw Error(`Invalid login!`);
        }
    }

    logoutUser() {
        this.userModel.logout();
    }

    checkLoginStatus() {
        return this.userModel.isLogged();
    }
}