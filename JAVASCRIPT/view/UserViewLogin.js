import UserController from '../controller/UserController.js'
import TeamsController from '../controller/TeamsController.js'

export default class UserView {
    constructor() {
        this.userController = new UserController();
        this.teamsController = new TeamsController();

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
                const teams = this.teamsController.getTeams();
                for (const team of teams) {
                    const membros = team.membros;
                    if (team.owner === this.loginUsername.value) {
                        this.teamsController.setUserTeam(team.id)
                    }
                    for (let i = 0; i < membros.length; i++) {
                        if (membros[i] === this.loginUsername.value) {
                            this.teamsController.setUserTeam(team.id)
                        }
                  }
                }
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