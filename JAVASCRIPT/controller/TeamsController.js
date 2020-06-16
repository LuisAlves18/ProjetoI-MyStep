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
    setCurrentTeam(id) {
        this.teamsModel.setCurrentTeam(id)
    }
    getCurrentTeam() {
        return this.teamsModel.getCurrentTeam()
    }
}