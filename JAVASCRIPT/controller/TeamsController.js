import TeamsModel from '../model/TeamsModel.js'
export default class TeamsController {
    constructor() {
        this.teamsModel = new TeamsModel();
    }
    createTeam(name, localidade, camisola, total_atletas, membros, logo, owner) {
        if (!this.teamsModel.getAll().some(team => team.name === name)) {
            this.teamsModel.create(name, localidade, camisola, total_atletas, membros, logo, owner);
        } else {
            throw Error(`Team with The name "${name}" already exists!`);
        }
    }
    getTeams() {
        const teams = this.teamsModel.getAll();
        return teams;


    }

    getPhoto(teamname) {
        const teams = this.teamsModel.getAll();
        for (const team of teams) {
            if (team.name === teamname) {
                return team.logo;
            }
        }
    }

    removeTeam(name) {
        this.teamsModel.remove(name)
    }

    updatePointsEvents(id, username, name, nPassword, email, birth, image, admin, stride, distance, eventType, shirt, shorts, shoes, pontos, eventsCount, status) {

    }

    updateMembersTotal(id, name, localidade, camisola, Ntotal_atletas, Nmembros, logo, owner) {
        this.teamsModel.updateMembersTotal(id, name, localidade, camisola, Ntotal_atletas, Nmembros, logo, owner);
    };

    setCurrentTeam(id) {
        this.teamsModel.setCurrentTeam(id)
    }
    getCurrentTeam() {
        return this.teamsModel.getCurrentTeam()
    }
}