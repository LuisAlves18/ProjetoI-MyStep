import UserController from '../controller/UserController.js'

export default class EquipmentDataView {
    constructor() {
        this.userController = new UserController();

        //verificação de login
        this.userController.LoginStatus();

        //dom form
        this.frmEquipmentData = document.getElementById('frmEquipmentData');

        //dom foto de perfil
        this.username = document.getElementById('username');
        this.profilePic = document.getElementById('profilePic');

        //dom camisolas
        this.tShirtCheckBox = document.getElementById('tShirtCheckBox');
        this.shirtThermalCheckBox = document.getElementById('shirtThermalCheckBox');
        this.sweaterCheckBox = document.getElementById('sweaterCheckBox');

        //dom calções
        this.shortsCheckBox = document.getElementById('shortsCheckBox');
        this.shortsThermalCheckBox = document.getElementById('shortsThermalCheckBox');

        //dom sapatilhas
        this.trailCheckBox = document.getElementById('trailCheckBox');
        this.roadCheckBox = document.getElementById('roadCheckBox');



        //dom buttons
        this.btnMakeChanges = document.getElementById('btnMakeChanges');
        this.btnUpdateData = document.getElementById('btnUpdateData');
        this.errorMessageRegister = document.getElementById('errorMessageRegister')

        //funções
        this.getPhoto();
        this.getName();
        this.getUserData(this.userController.getUsers())
        this.updateButtons();
        this.updateEquipmentData();
    }

    updateEquipmentData() {
        this.frmEquipmentData.addEventListener('submit', event => {
            event.preventDefault();
            this.checkedShirt = "";
            this.checkedShorts = "";
            this.checkedShoes = "";


            //verificação das camisolas
            if ((this.tShirtCheckBox.checked == true) && (this.shirtThermalCheckBox.checked == false) && (this.sweaterCheckBox.checked == false)) {
                this.checkedShirt = this.tShirtCheckBox.name;
            } else if ((this.tShirtCheckBox.checked == false) && (this.shirtThermalCheckBox.checked == true) && (this.sweaterCheckBox.checked == false)) {
                this.checkedShirt = this.shirtThermalCheckBox.name;
            } else if ((this.tShirtCheckBox.checked == false) && (this.shirtThermalCheckBox.checked == false) && (this.sweaterCheckBox.checked == true)) {
                this.checkedShirt = this.sweaterCheckBox.name;
            } else if ((this.tShirtCheckBox.checked == true) && (this.shirtThermalCheckBox.checked == true) && (this.sweaterCheckBox.checked == true)) {
                this.errorMessageRegister.innerHTML = "Don't select more then one option per group!";
                return false;
            } else {
                this.errorMessageRegister.innerHTML = "Select at least one from each group!";
                return false;
            }

            //verificação dos calções
            if ((this.shortsCheckBox.checked == true) && (this.shortsThermalCheckBox.checked == false)) {
                this.checkedShorts = this.shortsCheckBox.name;
            } else if ((this.shortsCheckBox.checked == false) && (this.shortsThermalCheckBox.checked == true)) {
                this.checkedShorts = this.shortsThermalCheckBox.name;

            } else if ((this.shortsCheckBox.checked == true) && (this.shortsThermalCheckBox.checked == true)) {
                this.errorMessageRegister.innerHTML = "Don't select more then one option per group!";
                return false;
            } else {
                this.errorMessageRegister.innerHTML = "Select at least one from each group!";
                return false;
            }

            //verificação das sapatilhas

            if ((this.roadCheckBox.checked == true) && (this.trailCheckBox.checked == false)) {
                this.checkedShoes = this.roadCheckBox.name;
            } else if ((this.roadCheckBox.checked == false) && (this.trailCheckBox.checked == true)) {
                this.checkedShoes = this.trailCheckBox.name;
            } else if ((this.roadCheckBox.checked == true) && (this.trailCheckBox.checked == true)) {
                this.errorMessageRegister.innerHTML = "Don't select more then one option per group!";
                return false;
            } else {
                this.errorMessageRegister.innerHTML = "Select at least one from each group!";
                return false;
            }



            this.userController.updateEquipmentData(this.checkedShirt, this.checkedShorts, this.checkedShoes);
            this.errorMessageRegister.innerHTML = "Equipment Data updated with success!";
            this.turnCheckBoxDisabled();
            location.reload();
        })
    }

    turnCheckBoxDisabled() {
        this.tShirtCheckBox.disabled = true;
        this.shirtThermalCheckBox.disabled = true;
        this.sweaterCheckBox.disabled = true;

        this.shortsCheckBox.disabled = true;
        this.shortsThermalCheckBox.disabled = true;

        this.roadCheckBox.disabled = true;
        this.trailCheckBox.disabled = true;
    }

    updateButtons() {
        this.btnMakeChanges.addEventListener('click', event => {
            this.tShirtCheckBox.disabled = false;
            this.shirtThermalCheckBox.disabled = false;
            this.sweaterCheckBox.disabled = false;

            this.shortsCheckBox.disabled = false;
            this.shortsThermalCheckBox.disabled = false;

            this.roadCheckBox.disabled = false;
            this.trailCheckBox.disabled = false;

            this.btnMakeChanges.style.visibility = "hidden";
            this.btnUpdateData.style.visibility = "visible";
        })
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

    getUserData(users = []) {
        for (const user of users) {
            if (sessionStorage.getItem('loggedUser') === user.username) {
                if (user.shirt === "tShirt") {
                    this.tShirtCheckBox.checked = true;
                } else if (user.shirt === "shirtThermal") {
                    this.shirtThermalCheckBox.checked = true;
                } else if (user.shirt === "sweater") {
                    this.sweaterCheckBox.checked = true;
                } else if (user.shirt === "none") {
                    this.tShirtCheckBox.checked = false;
                    this.shirtThermalCheckBox.checked = false;
                    this.sweaterCheckBox.checked = false;
                }

                if (user.shorts === "shorts") {
                    this.shortsCheckBox.checked = true;
                } else if (user.shorts === "shortsThermal") {
                    this.shortsThermalCheckBox.checked = true;
                } else if (user.shorts === "none") {
                    this.shortsCheckBox.checked = false;
                    this.shortsThermalCheckBox.checked = false;
                }

                if (user.shoes === "trail") {
                    this.trailCheckBox.checked = true;
                } else if (user.shoes === "road") {
                    this.roadCheckBox.checked = true;
                } else if (user.shoes === "none") {
                    this.trailCheckBox.checked = false;
                    this.roadCheckBox.checked = false;
                }
            }
        }
    }
}