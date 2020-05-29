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
        this.registerMessage = document.getElementById('errorMessageRegister');

        this.bindAddRegisterForm();

        //login DOM
        this.loginForm = document.getElementById('frmLogin');
        this.loginUsername = document.getElementById('LogUsername');
        this.loginPassword = document.getElementById('Logpassw');
        this.loginMessage = document.getElementById('errorMessageLogin');

        this.bindAddLoginForm();

        //buttons DOM
        this.registerButton = document.getElementById('btnRegister');
        this.loginButton = document.getElementById('btnLogin');
        this.logoutButton = document.getElementById('logout');

        this.bindAddLogoutEvent();

        
    }

    bindAddRegisterForm() {
        this.registerForm.addEventListener('submit', event => {
            event.preventDefault();

            try {
                if (this.registerPassword.value !== this.registerPassword2.value) {
                    throw Error('Password and Confirm Password are not equal!');
                }
                this.userController.createUser(this.registerUsername.value, this.registerFullname.value, this.registerPassword.value, this.registerEmail.value, this.registerBirth.value, this.registerAdminCheck);
                this.displayRegisterMessage('User Registered with success!', 'success');
                location.href = '../HTML/login.html';
            } catch(e) {
                this.displayRegisterMessage(e, 'danger');
            }
        });
    }

    bindAddLoginForm() {
        this.loginForm.addEventListener('submit', event =>{
            event.preventDefault();

            try {
                this.userController.loginUser(this.loginUsername.value, this.loginPassword.value);
                this.displayLoginMessage('User logged with success!','success');
                location.href = '../HTML/profile.html';
            } catch(e) {
                this.displayLoginMessage(e, 'danger');
            }
        });
    }

    bindAddLogoutEvent() {
        this.logoutButton.addEventListener('click', event => {
            this.userController.logoutUser();
            //this.updateButtons('logout');
            //location.reload()
            

        });
    }

    displayRegisterMessage(message, type) {
        this.registerMessage.innerHTML =
            `${message}`;
    }

    displayLoginMessage(message, type) {
        this.loginMessage.innerHTML =
            `${message}`;
    }
}