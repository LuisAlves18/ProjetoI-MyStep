import UserController from '../controller/UserController.js'
import TeamsController from '../controller/TeamsController.js';

export default class UserViewLogout {
    constructor() {

        this.userController = new UserController();
        this.teamsController = new TeamsController();
        this.userController.LoginStatus();

        this.logoutButton = document.getElementById('logout');
        this.loggedUser = document.getElementById('name');

        //dom display admin (running and equipment data, manage entities page)
        this.runningDataDisplay = document.getElementById('runningData');
        this.equipmentDataDisplay = document.getElementById('equipmentData');
        this.manageUsers = document.getElementById('manageUsers');
        this.manageEvents = document.getElementById('manageEvents');
        this.manageTeams = document.getElementById('manageTeams');
        this.myTeam = document.getElementById('myTeam');
        this.teamsPage = document.getElementById('teamsPage');

        //this.userController.personLogged();
        this.checkTeam(this.teamsController.getTeams())
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
        if (this.userController.CheckAdminLogin() == true) {
            this.runningDataDisplay.style.display = "none";
            this.equipmentDataDisplay.style.display = "none";
        } else {
            this.manageUsers.style.display = "none";
            this.manageEvents.style.display = "none";
            this.manageTeams.style.display = "none";
        }
    }

    checkTeam(teams = []) {
        this.currentUser = this.userController.LoginStatus();
        for (const team of teams) {
            this.members = team.membros;
            for (let i = 0; i < this.members.length; i++) {
                if (this.members[i] === this.currentUser) {
                    this.userTeam = team.id;
                    this.teamsController.setUserTeam(team.id);
                    this.teamsPage.style.display = "none";
                    return true;
                }
            }
        }

        this.myTeam.style.display = "none";
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