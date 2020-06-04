import UserController from '../controller/UserController.js'

export default class EventsInfoView {
    constructor() {
        this.userController = new UserController();

        //verificação para forçar o utilizador a ir para o login caso não haja SessionStorage
        this.userController.LoginStatus();
    }

    
}