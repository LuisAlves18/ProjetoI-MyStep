import UserController from '../controller/UserController.js'
import TeamsController from '../controller/TeamsController.js'


export default class CreateTeamView {
    constructor() {
        this.userController = new UserController();
        this.teamsController = new TeamsController();
        //verificação para forçar o utilizador a ir para o login caso não haja SessionStorage

        this.frmCreate = document.querySelector("#frmCreate")
            //this.btnCreate = document.querySelector("#create");
        this.teamName = document.getElementById('teamName');
        this.teamPlace = document.querySelector("#localidade");
        this.teamShirt = document.querySelector("#shirt");
        this.teamLogo = document.querySelector("#logo");
        this.total_atletas = 1;
        this.owner = this.userController.LoginStatus();
        this.membros = [this.owner];
        this.shirtImage = document.getElementById('shirtImage');
        this.logoImage = document.getElementById('logoImage');
        this.bindAddTeam();
        this.showImage();

    }
    bindAddTeam() {
        this.frmCreate.addEventListener("submit", event => {
            event.preventDefault();
            console.log(this.teamName.value);
            console.log(this.teamPlace.value);
            console.log(this.teamShirt.value);
            console.log(this.total_atletas);
            console.log(this.owner);
            console.log(this.owner);
            this.imgDataShirt = this.getBase64Image(this.shirtImage)
            this.imgDataLogo = this.getBase64Image(this.logoImage)
                //this.userController.uploadPhoto(this.imgData);
            this.teamsController.createTeam(this.teamName.value, this.teamPlace.value, this.imgDataShirt, this.total_atletas, this.membros, this.imgDataLogo, this.owner)
                // Wait 1 second before sending to catalog, so the user can see the login success message
            setTimeout(() => {
                    location.href = "../index.html";
                },
                1000);
        })
    }

    getBase64Image(img) {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext("2d");


        /* var image = new Image();
        image.src = img.src;
        console.log('img.src ->',img);
        image.onload = function() {
            ctx.drawImage(image, 0, 0);
        } */
        ctx.drawImage(img, 0, 0);

        var image = canvas.toDataURL("image/png");

        return image.replace(/^data:image\/(png|jpg);base64,/, "");
    }

    showImage() {
        this.teamLogo.addEventListener('change', event => {
            const img = this.teamLogo.files[0];
            this.logoImage.src = window.URL.createObjectURL(img);
        })

        this.teamShirt.addEventListener('change', event => {
            const img2 = this.teamShirt.files[0];
            this.shirtImage.src = window.URL.createObjectURL(img2);
        })
    }

}