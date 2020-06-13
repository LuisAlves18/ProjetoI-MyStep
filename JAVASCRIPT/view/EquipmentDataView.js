import UserController from '../controller/UserController.js'

export default class EquipmentDataView {
    constructor() {
        this.userController = new UserController();

        //verificação de login
        this.userController.LoginStatus();
    }
}