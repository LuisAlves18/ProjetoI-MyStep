import UserController from '../controller/UserController.js'

export default class TrainingView {
    constructor() {
        this.userController = new UserController();

        this.userController.LoginStatus();
    }

    
}