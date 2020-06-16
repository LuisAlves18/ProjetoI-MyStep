import UserController from '../controller/UserController.js'

export default class UserViewLogout {
    constructor() {

        this.userController = new UserController();

        this.logoutButton = document.getElementById('logout');
        this.loggedUser = document.getElementById('name');

        //this.userController.personLogged();
        this.bindAddLogoutEvent();


    }

    bindAddLogoutEvent() {
        this.logoutButton.addEventListener('click', event => {
            this.userController.logoutUser();

            location.href = '../HTML/login.html';
        });
    }

    checkLogged() {
        /* if (this.userController.checkLoginStatus()!== null) {
            console.log('login status', this.userController.checkLoginStatus());
            console.log('person' , this.userController.person);
            
            
            this.loggedUser.innerHTML = this.userController.checkLoginStatus();
        } else {
            location.href = 'HTML/login.html'
        } */

        if (sessionStorage.getItem('loggedUser') !== null) {
            this.personLogged = sessionStorage.getItem('loggedUser')
                //this.loggedUser.innerHTML = this.personLogged
        } else if (sessionStorage.getItem('loggedAdmin') !== null) {
            this.personLogged = sessionStorage.getItem('loggedAdmin')
                //this.loggedUser.innerHTML = this.personLogged
        } else {
            location.href = '../HTML/login.html';
        }



    }
}