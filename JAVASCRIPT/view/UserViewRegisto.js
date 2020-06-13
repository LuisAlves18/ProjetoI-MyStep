import UserController from '../controller/UserController.js'

export default class UserView {
    constructor() {
        this.userController = new UserController();

        //register DOM
        this.registerForm = document.getElementById('frmRegisto');
        this.registerUsername = document.getElementById('RegUsername');
        this.registerFullname = document.getElementById('name');
        this.registerPassword = document.getElementById('RegPassw');
        this.registerPassword2 = document.getElementById('confpassw');
        this.registerEmail = document.getElementById('email');
        this.registerBirth = document.getElementById('age');
        this.registerAdminCheck = 'false';
        this.stride = "none";
        this.distance = "none";
        this.eventType = "none";
        this.imageUser = 'OUTROS/download.png';
        this.registerMessage = document.getElementById('errorMessageRegister');

        this.bindAddRegisterForm();

        //buttons DOM
        this.registerButton = document.getElementById('btnRegister');
    }

    bindAddRegisterForm() {
        this.registerForm.addEventListener('submit', event => {
            event.preventDefault();

            try {
                if (this.registerPassword.value !== this.registerPassword2.value) {
                    throw Error('Password and Confirm Password are not equal!');
                }
                this.userController.createUser(this.registerUsername.value, this.registerFullname.value, this.registerPassword.value, this.registerEmail.value, this.registerBirth.value, this.imageUser, this.registerAdminCheck, this.stride, this.distance, this.eventType);
                this.displayRegisterMessage('User Registered with success!', 'success');
                location.href = '../HTML/login.html';
            } catch (e) {
                this.displayRegisterMessage(e, 'danger');
            }
        });
    }

    displayRegisterMessage(message, type) {
        this.registerMessage.innerHTML =
            `${message}`;
    }
}