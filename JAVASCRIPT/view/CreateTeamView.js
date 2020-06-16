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
        this.bindAddTeam();


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
            this.imgData = this.getBase64Image(this.image)
            this.userController.uploadPhoto(this.imgData);
            this.teamsController.createTeam(this.teamName.value, this.teamPlace.value, this.teamShirt.value, this.total_atletas, this.membros, this.teamLogo.value, this.owner)
        })
    }

}