import UserController from '../controller/UserController.js'

export default class EditProfileView {
    constructor() {
        this.userController = new UserController();

        //verificação para forçar o utilizador a ir para o login caso não haja SessionStorage
        this.userController.LoginStatus();



        //DOM email
        this.frmUpdateEmail = document.getElementById('frmUpdateEmail');
        this.btnChangeEmail = document.getElementById('btnChangeEmail');
        this.txtEmail = document.getElementById('txtEmail');
        this.showSettings();
        this.btnUpdateEmail = document.getElementById('btnUpdateEmail');
        this.emailErrorMessage = document.getElementById('emailErrorMessage');

        //DOM password
        this.frmUpdatePassword = document.getElementById('frmUpdatePassword');
        this.containerPassword = document.getElementById('container-password');
        this.txtPassword = document.getElementById('txtPassword');
        this.txtConfPassword = document.getElementById('txtConfPassword');
        this.passwordErrorMessage = document.getElementById('passwordErrorMessage');
        this.btnUpdatePassowrd = document.getElementById('btnUpdatePassowrd');
        this.passwordDiv = document.getElementById('passwordDiv');
        this.btnChangePassowrd = document.getElementById('btnChangePassowrd');

        //DOM photo
        this.frmUpdatePhoto = document.getElementById('frmUpdatePhoto');
        this.btnChangePhoto = document.getElementById('btnChangePhoto');
        this.btnOpenFile = document.getElementById('btnOpenFile');
        this.image = document.getElementById('picture');


        this.regBox = document.getElementById('RegBox');

        //chamar funções
        this.getImage();
        this.updateButtonsPassword();
        this.updatePassword();

        this.showImage();

        this.setImage();



    }

    setImage() {
        this.frmUpdatePhoto.addEventListener('submit', event => {
            event.preventDefault();
            this.imgData = this.getBase64Image(this.image)
            this.userController.uploadPhoto(this.imgData);
        })

    }

    getImage() {
        /* if (sessionStorage.getItem('loggedUser') !== null) {
            var dataImage = this.userController.getPhoto(sessionStorage.getItem('loggedUser'));
        } else if (sessionStorage.getItem('loggedAdmin') !== null) {
            var dataImage = this.userController.getPhoto(sessionStorage.getItem('loggedAdmin'));
        }

        this.image.src = "data:image/png;base64," + dataImage; */

        this.users = this.userController.getUsers();
        for (const user of this.users) {
            if (user.username === this.userController.LoginStatus()) {
                if (user.image === 'OUTROS/download.png') {
                    this.image.src = user.image;
                } else {
                    var dataImage = user.image;
                    this.image.src = "data:image/png;base64," + dataImage
                }


            }

        }
    }

    getBase64Image(img) {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext("2d");



        ctx.drawImage(img, 0, 0);

        var image = canvas.toDataURL("image/png");

        return image.replace(/^data:image\/(png|jpg);base64,/, "");
    }


    showImage() {
        this.btnOpenFile.addEventListener('change', event => {
            const img = this.btnOpenFile.files[0];
            this.image.src = window.URL.createObjectURL(img);
        })
    }




    updateButtonsPassword() {
        this.btnChangePassowrd.addEventListener('click', event => {
            event.preventDefault();

            this.txtConfPassword.readOnly = false;
            this.txtPassword.readOnly = false;
            this.txtConfPassword.placeholder = "New Password";
            this.txtPassword.placeholder = "Confirm New Password";
            this.btnChangePassowrd.style.visibility = "hidden";
            this.btnUpdatePassowrd.style.visibility = "visible";
            this.txtEmail.readOnly = false;

        })


    }

    updatePassword() {
        this.frmUpdatePassword.addEventListener('submit', event => {
            event.preventDefault();
            try {

                this.userController.updateSettings(this.txtPassword.value, this.txtConfPassword.value, this.txtEmail.value)
                this.displayErrorMessage("Settings changed with success!")
                    // Wait 1 second before sending to catalog, so the user can see the login success message
                setTimeout(() => {
                        location.reload();
                    },
                    1000);
            } catch (error) {
                this.displayErrorMessage(error, 'danger');
            }

        })
    }




    showSettings() {
        if (sessionStorage.getItem('loggedUser') !== null) {
            this.txtEmail.value = this.userController.getUserSettings(sessionStorage.getItem('loggedUser'));
        } else if (sessionStorage.getItem('loggedAdmin') !== null) {
            this.txtEmail.value = this.userController.getUserSettings(sessionStorage.getItem('loggedAdmin'));
        }

    }


    displayErrorMessage(messagePassword) {

        this.passwordErrorMessage.innerHTML =
            `${messagePassword}`;
    }


}