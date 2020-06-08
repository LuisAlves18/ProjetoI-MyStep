import TeamsModel from '../model/TeamsModel'
export default class TeamsController {
    constructor() {
        this.teamsModel = new TeamsModel();
    }
    createTeam(name, localidade, camisola, total_atletas, membros) {
        if (!this.teamModel.getAll().some(team => team.name === name)) {
            this.teamsModel.create(name, localidade, camisola, total_atletas, membros);
        } else {
            throw Error(`Team with The name "${name}" already exists!`);
        }
    }
}