import UserController from '../controller/UserController.js'
import TeamsController from '../controller/TeamsController.js'

export default class TeamsInfoView {
    constructor() {
        this.userController = new UserController();
        this.teamsController = new TeamsController();
        //verificação para forçar o utilizador a ir para o login caso não haja SessionStorage
        this.userController.LoginStatus();
        this.teamLogo = document.querySelector("#photo")
        this.teamName = document.querySelector('h2#name');
        this.TeamCamisola = document.querySelector("#camisola")
        this.tblMembers = document.querySelector("#TblMembers")
        this.generateMembers();
        this.fillTeamData();
        this.bindJoinTeam();

    }
    generateMembers() {
        const currentTeam = this.teamsController.getCurrentTeam()
        const membros = currentTeam.membros

        let html = `<table class="table table-dark">
        <thead>
            <tr>
                <th scope="col"></th>
                <th scope="col">Name</th>
            </tr>
        </thead>
        <tbody>`

        for (let i = 0; i < membros.length; i++) {
            html += `<tr>
            <th scope="row">${i+1}</th>
            <td>${membros[i]}</td>
        </tr>`
        }
        html += ` </tbody>
        </table> `
        return html;
    }

    fillTeamData() {

        const currentTeam = this.teamsController.getCurrentTeam()
        this.teamName.innerHTML = currentTeam.name;
        this.teamLogo.src = currentTeam.logo;
        this.TeamCamisola.src = currentTeam.camisola;
        this.tblMembers.innerHTML = this.generateMembers();
    }


}