import UserController from '../controller/UserController.js'

export default class RunningDataView {
    constructor() {
        this.userController = new UserController();

        //verificação de login
        this.userController.LoginStatus();

        //dom buttons
        this.btnMakeChanges = document.getElementById('btnMakeChanges');
        this.btnUpdateData = document.getElementById('btnUpdateData');

        //dom form
        this.frmRunData = document.getElementById('frmRunData');

        //dom checkbox
        this.pronationCheckBox = document.getElementById('pronationCheckBox');
        this.suspinationCheckBox = document.getElementById('suspinationCheckBox');
        this.neutralCheckBox = document.getElementById('neutralCheckBox');

        this.fivekmCheckBox = document.getElementById('fivekmCheckBox');
        this.tenkmCheckBox = document.getElementById('tenkmCheckBox');
        this.twentyOnekmCheckBox = document.getElementById('twentyOnekmCheckBox');
        this.fourtyTwokmCheckBox = document.getElementById('fourtyTwokmCheckBox');

        this.runCheckBox = document.getElementById('runCheckBox');
        this.walkCheckBox = document.getElementById('walkCheckBox');

        //dom identificador de perfil
        this.username = document.getElementById('username');
        this.profilePic = document.getElementById('profilePic');

        //dom mensagem de erro
        this.errorMessageRegister = document.getElementById('errorMessageRegister');

        //funções
        this.updateButtons();
        this.getUserData(this.userController.getUsers());
        this.updateRunData();
        this.getPhoto();
        this.getName();
    }

    updateButtons() {
        this.btnMakeChanges.addEventListener('click', event => {
            this.pronationCheckBox.disabled = false;
            this.suspinationCheckBox.disabled = false;
            this.neutralCheckBox.disabled = false;

            this.fivekmCheckBox.disabled = false;
            this.tenkmCheckBox.disabled = false;
            this.twentyOnekmCheckBox.disabled = false;
            this.fourtyTwokmCheckBox.disabled = false;

            this.runCheckBox.disabled = false;
            this.walkCheckBox.disabled = false;

            this.btnMakeChanges.style.visibility = "hidden";
            this.btnUpdateData.style.visibility = "visible";
        })
    }

    turnCheckBoxDisabled() {
        this.pronationCheckBox.disabled = true;
        this.suspinationCheckBox.disabled = true;
        this.neutralCheckBox.disabled = true;

        this.fivekmCheckBox.disabled = true;
        this.tenkmCheckBox.disabled = true;
        this.twentyOnekmCheckBox.disabled = true;
        this.fourtyTwokmCheckBox.disabled = true;

        this.runCheckBox.disabled = true;
        this.walkCheckBox.disabled = true;
    }

    getUserData(users = []) {
        for (const user of users) {
            if (sessionStorage.getItem('loggedUser') === user.username) {
                if (user.stride === "pronation") {
                    this.pronationCheckBox.checked = true;
                } else if (user.stride === "suspination") {
                    this.suspinationCheckBox.checked = true;
                } else if (user.stride === "neutral") {
                    this.neutralCheckBox.checked = true;
                } else if (user.stride === "none") {
                    this.pronationCheckBox.checked = false;
                    this.suspinationCheckBox.checked = false;
                    this.neutralCheckBox.checked = false;
                }

                if (user.distance === "fivekm") {
                    this.fivekmCheckBox.checked = true;
                } else if (user.distance === "tenkm") {
                    this.tenkmCheckBox.checked = true;
                } else if (user.distance === "twentyOnekm") {
                    this.twentyOnekmCheckBox.checked = true;
                } else if (user.distance === "fourtyTwokm") {
                    this.fourtyTwokmCheckBox.checked = true;
                } else if (user.distance === "none") {
                    this.fivekmCheckBox.checked = false;
                    this.tenkmCheckBox.checked = false;
                    this.twentyOnekmCheckBox.checked = false;
                    this.fourtyTwokmCheckBox.checked = false;
                }

                if (user.eventType === "run") {
                    this.runCheckBox.checked = true;
                } else if (user.eventType === "walk") {
                    this.walkCheckBox.checked = true;
                } else if (user.eventType === "none") {
                    this.runCheckBox.checked = false;
                    this.walkCheckBox.checked = false;
                }
            }
        }
    }

    getPhoto() {
        if (sessionStorage.getItem('loggedUser') !== null) {
            var dataImage = this.userController.getPhoto(sessionStorage.getItem('loggedUser'));
        } else if (sessionStorage.getItem('loggedAdmin') !== null) {
            var dataImage = this.userController.getPhoto(sessionStorage.getItem('loggedAdmin'));
        }

        this.profilePic.src = "data:image/png;base64," + dataImage;
    }

    getName() {
        if (sessionStorage.getItem('loggedUser') !== null) {
            this.username.innerHTML = this.userController.getName(sessionStorage.getItem('loggedUser'));
        } else if (sessionStorage.getItem('loggedAdmin') !== null) {
            this.username.innerHTML = this.userController.getName(sessionStorage.getItem('loggedAdmin'));
        }


    }

    updateRunData() {
        this.frmRunData.addEventListener('submit', event => {
            event.preventDefault();
            this.checkedStride = "";
            this.checkedDistance = "";
            this.checkedEvent = "";

            //verificação das strides
            if ((this.pronationCheckBox.checked == true) && (this.suspinationCheckBox.checked == false) && (this.neutralCheckBox.checked == false)) {
                this.checkedStride = this.pronationCheckBox.name;
            } else if ((this.pronationCheckBox.checked == false) && (this.suspinationCheckBox.checked == true) && (this.neutralCheckBox.checked == false)) {
                this.checkedStride = this.suspinationCheckBox.name;
            } else if ((this.pronationCheckBox.checked == false) && (this.suspinationCheckBox.checked == false) && (this.neutralCheckBox.checked == true)) {
                this.checkedStride = this.neutralCheckBox.name;
            } else {
                this.errorMessageRegister.innerHTML = "Don't select more then one option per group!";
                return false;
            }

            //verificação das distances
            if ((this.fivekmCheckBox.checked == true) && (this.tenkmCheckBox.checked == false) && (this.twentyOnekmCheckBox.checked == false) && (this.fourtyTwokmCheckBox.checked == false)) {
                this.checkedDistance = this.fivekmCheckBox.name;
            } else if ((this.fivekmCheckBox.checked == false) && (this.tenkmCheckBox.checked == true) && (this.twentyOnekmCheckBox.checked == false) && (this.fourtyTwokmCheckBox.checked == false)) {
                this.checkedDistance = this.tenkmCheckBox.name;
            } else if ((this.fivekmCheckBox.checked == false) && (this.tenkmCheckBox.checked == false) && (this.twentyOnekmCheckBox.checked == true) && (this.fourtyTwokmCheckBox.checked == false)) {
                this.checkedDistance = this.twentyOnekmCheckBox.name;
            } else if ((this.fivekmCheckBox.checked == false) && (this.tenkmCheckBox.checked == false) && (this.twentyOnekmCheckBox.checked == false) && (this.fourtyTwokmCheckBox.checked == true)) {
                this.checkedDistance = this.fourtyTwokmCheckBox.name;
            } else {
                this.errorMessageRegister.innerHTML = "Don't select more then one option per group!";
                return false;
            }

            //verificação dos eventsType

            if ((this.runCheckBox.checked == true) && (this.walkCheckBox.checked == false)) {
                this.checkedEvent = this.runCheckBox.name;
            } else if ((this.runCheckBox.checked == false) && (this.walkCheckBox.checked == true)) {
                this.checkedEvent = this.walkCheckBox.name;
            } else {
                this.errorMessageRegister.innerHTML = "Don't select more then one option per group!";
                return false;
            }

            this.userController.updateRunData(this.checkedStride, this.checkedDistance, this.checkedEvent);
            this.errorMessageRegister.innerHTML = "Run Data updated with success!";
            this.turnCheckBoxDisabled();
            // Wait 1 second before sending to catalog, so the user can see the login success message
            setTimeout(() => {
                    location.reload();
                },
                1000);
        })
    }

    displayErrorMessage(messagePassword) {

        this.errorMessageRegister.innerHTML =
            `${messagePassword}`;
    }
}