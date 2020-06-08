export default class teamsModel {
    constructor() {
        this.teams = localStorage.teams ? JSON.parse(localStorage.teams) : [];
    }

    getAll() {
        return this.teams;
    }
    create(name, localidade, camisola, total_atletas, membros, logo) {
        const team = {
            id: this.teams.length > 0 ? this.teams[this.teams.length - 1].id + 1 : 1,
            name: name,
            localidade: localidade,
            camisola: camisola,
            total_atletas: total_atletas,
            membros: membros,
            logo: logo
        }
        this.teams.push(team);
        this._persist();
    }
    remove(team) {
        this.teams = this.teams.filter(name => team.name != name)
        this._persist()
    }
    setCurrentTeam(id) {
        localStorage.setItem("current_team", id);
    }
    getCurrentTeam() {
        return this.teams.find(team => team.id === +localStorage.current_team)
    }
    _persist() {
        localStorage.setItem('teams', JSON.stringify(this.teams));
    }
}