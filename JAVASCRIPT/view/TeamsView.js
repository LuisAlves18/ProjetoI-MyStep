import UserController from '../controller/UserController.js'
import TeamsController from '../controller/TeamsController.js'


export default class TeamsView {
    constructor() {
        this.userController = new UserController();
        this.teamsController = new TeamsController();
        //verificação para forçar o utilizador a ir para o login caso não haja SessionStorage
        this.userController.LoginStatus();

        this.catalog = document.querySelector("#catalog");
        this.btnCreate = document.querySelector("#GoCreate")
            /* this.getImage(); */
        this.renderCatalog(this.teamsController.getTeams())
        this.bindGoCreateTeam();

    }
    bindGoCreateTeam() {
        this.btnCreate.addEventListener("click", function() {
            location.href = 'HTML/create-team.html'
        })
    }
    bindAddSeeMoreTeam() {
        for (const btnSee of document.querySelectorAll(".see")) {
            btnSee.addEventListener('click', team => {
                this.teamsController.setCurrentTeam(team.target.id)
                location.href = 'HTML/teams-info.html';
            })
        }
    }

    bindAddRemoveEvent() {
        for (const btnRemove of document.getElementsByClassName("remove")) {
            btnRemove.addEventListener('click', event => {
                this.teamsController.removeTeam(event.target.id)
                this.renderCatalog(this.teamsController.getTeams())
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

        this.bindAddRemoveEvent()
        this.bindAddSeeMoreTeam()
    }

    _generateTeamCard(team) {
        var dataImage = this.teamsController.getPhoto(team.name);
        this.image = "data:image/png;base64," + dataImage;
        let html = `
        <div class="col-sm-12 col-md-6 col-lg-3">
            <div class="card">
                <div class="card-body">
                <img class="card-img-top img" src="${this.image}" alt="">
                    <h4 class="card-title">${team.name}</h4>
                    <button id="${team.id}" class="btn btn-primary see">See more</button>
            `
        if (sessionStorage.getItem('loggedAdmin') !== null) {
            html += `<button id="${team.name}" class="btn btn-danger remove">Remove</button>`
        }

        html += `
                </div>
            </div>
        </div>        
        `
        return html
    }



}