import UserController from '../controller/UserController.js'

export default class UserView {
    constructor() {
        this.userController = new UserController();

        //login DOM
        this.loginForm = document.getElementById('frmLogin');
        this.loginUsername = document.getElementById('LogUsername');
        this.loginPassword = document.getElementById('Logpassw');
        this.loginMessage = document.getElementById('errorMessageLogin');

        this.bindAddLoginForm();

        //buttons DOM
        this.loginButton = document.getElementById('btnLogin');
    }

    bindAddLoginForm() {
        this.loginForm.addEventListener('submit', event => {
            event.preventDefault();

            try {
                this.userController.loginUser(this.loginUsername.value, this.loginPassword.value);
                this.displayLoginMessage('User logged with success!','success');
                location.href = '../index.html';
            } catch(e) {
                this.displayLoginMessage(e, 'danger');
                console.log('deu erro aqui na view')
            }
        });
    }

    checkLoginStatus() {
        if(this.userController.checkLoginStatus()) {
            location.href = '../index.html';
        } else {
            location.href = '../HTML/login.html';
        }
        
    }

    displayLoginMessage(message, type) {
        this.loginMessage.innerHTML =
            `${message}`;
    }
}