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
        this.btnJoin = document.querySelector("#join")
        this.btnLeaveTeam = document.getElementById('leaveTeam');
        this.buttonJoinDisplay();
        this.generateMembers();
        this.fillTeamData();
        this.bindJoinTeam();
        this.bindLeaveTeam();

    }

    buttonJoinDisplay() {
        


        if (this.teamsController.getUserTeam() !== null) {
            const currentTeam = this.teamsController.getUserTeam()
            this.currentUser = this.userController.LoginStatus();
            let members = currentTeam.membros;
            for (let i = 0; i < members.length; i++) {
                if (members[i] === this.currentUser) {
                    //console.log("entrou no if")
                    this.btnJoin.style.display = "none";
                    return true
                }

            }
            this.btnLeaveTeam.style.display = "none";
        } else {
            const currentTeam = this.teamsController.getCurrentTeam()
            this.currentUser = this.userController.LoginStatus();
            let members = currentTeam.membros;
            for (let i = 0; i < members.length; i++) {
                if (members[i] === this.currentUser) {
                    //console.log("entrou no if")
                    this.btnJoin.style.display = "none";
                    return true
                }

            }
            this.btnLeaveTeam.style.display = "none";
        }

    }

    bindJoinTeam() {
        const currentTeam = this.teamsController.getCurrentTeam()
        this.btnJoin.addEventListener('click', event => {
            event.preventDefault()
            let Nmembros = currentTeam.membros
            let Ntotal_atletas = currentTeam.total_atletas
            Nmembros.push(this.userController.LoginStatus())
            Ntotal_atletas = Nmembros.length;
            console.log(Nmembros);
            this.teamsController.updateMembersTotal(currentTeam.id, currentTeam.name, currentTeam.localidade, currentTeam.camisola, Ntotal_atletas, Nmembros, currentTeam.logo, currentTeam.owner);
            // Wait 1 second before sending to catalog, so the user can see the login success message
            setTimeout(() => {
                    location.href = "../index.html";
                },
                1000);
        })

    }

    bindLeaveTeam() {
        this.btnLeaveTeam.addEventListener('click', event => {
            event.preventDefault();
            const currentTeam = this.teamsController.getUserTeam()

            this.membros = currentTeam.membros;
            this.nMembers = []
            for (let i = 0; i < this.membros.length; i++) {
                if (this.membros[i] !== this.userController.LoginStatus()) {
                    this.nMembers.push(this.membros[i]);
                }
            }

            this.teamsController.leaveTeam(this.nMembers, currentTeam.name);
            location.href = '../index.html'

        })




    }

    generateMembers() {
        if (this.teamsController.getUserTeam() === null) {
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
        } else {
            const currentTeam = this.teamsController.getUserTeam()
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

    }

    fillTeamData() {
        if (this.teamsController.getUserTeam() === null) {
            const currentTeam = this.teamsController.getCurrentTeam();
            this.teamName.innerHTML = currentTeam.name;
            this.teamLogo.src = "data:image/png;base64," + currentTeam.logo;
            this.TeamCamisola.src = "data:image/png;base64," + currentTeam.camisola;
            this.tblMembers.innerHTML = this.generateMembers();
        } else {
            const currentTeam = this.teamsController.getUserTeam();
            this.teamName.innerHTML = currentTeam.name;
            this.teamLogo.src = "data:image/png;base64," + currentTeam.logo;
            this.TeamCamisola.src = "data:image/png;base64," + currentTeam.camisola;
            this.tblMembers.innerHTML = this.generateMembers();
        }

    }


}