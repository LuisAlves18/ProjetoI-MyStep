import UserController from '../controller/UserController.js'

export default class UserViewLogout {
    constructor() {

        this.userController = new UserController();
        this.userController.LoginStatus();

        this.logoutButton = document.getElementById('logout');
        this.loggedUser = document.getElementById('name');

        //dom display admin (running and equipment data, manage entities page)
        this.runningDataDisplay = document.getElementById('runningData');
        this.equipmentDataDisplay = document.getElementById('equipmentData');
        this.manageUsers = document.getElementById('manageUsers');
        this.manageEvents = document.getElementById('manageEvents');
        this.manageTeams = document.getElementById('manageTeams');

        //this.userController.personLogged();
        this.bindAddLogoutEvent();
        this.displayAdmin();


    }

    bindAddLogoutEvent() {
        this.logoutButton.addEventListener('click', event => {
            this.userController.logoutUser();

            location.href = '../HTML/login.html';
        });
    }

    displayAdmin() {
        if (this.userController.CheckAdminLogin()) {
            this.runningDataDisplay.style.display = "none";
            this.equipmentDataDisplay.style.display = "none";
        } else {
            this.manageUsers.style.display = "none";
            this.manageEvents.style.display = "none";
            this.manageTeams.style.display = "none";
        }
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