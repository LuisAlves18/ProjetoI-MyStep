import UserController from '../controller/UserController.js'
import TeamsController from '../controller/TeamsController.js'


export default class TeamsView {
    constructor() {
        this.userController = new UserController();
        this.teamsController = new TeamsController();
        //verificação para forçar o utilizador a ir para o login caso não haja SessionStorage
        this.userController.LoginStatus();

        this.catalog = document.querySelector("#catalog");
        this.renderCatalog(this.teamsController.getTeams())
    }
    bindAddSeeMoreTeam() {
        for (const btnSee of document.querySelectorAll(".see")) {
            btnSee.addEventListener('click', event => {
                this.teamsController.setCurrentTeam(event.target.id)
                location.href = 'HTML/teams-info.html';
            })
        }
    }
    renderCatalog(teams = []) {
        let result = ''
        let i = 0
        for (const team of teams) {
            if (i % 3 === 0) { result += `<div class="row justify-content-center">` }
            result += this._generateTeamCard(team)
            i++
            if (i % 3 === 0) { result += `</div>` }
        }

        this.catalog.innerHTML = result
            //this._renderAddEventButton(this.userController.checkLoginStatus());

        //this.bindAddRemoveEvent()
        //this.bindAddSeeMoreEvent()
    }

    _generateTeamCard(team) {
        let html = `
        <div class="col-sm-12 col-md-6 col-lg-3">
            <div class="card">
                <div class="card-body">
                <img class="card-img-top" src="${team.logo}" alt="">
                    <h4 class="card-title">${team.name}</h4>
                    <button id="${team.id}" class="btn btn-primary see">See more</button>
            `
            /* if (this.userController.checkLoginStatus()) {
                html += `<button id="${event.name}" class="btn btn-danger remove">Remove</button>`
            } */

        html += `
                </div>
            </div>
        </div>        
        `
        return html
    }



}