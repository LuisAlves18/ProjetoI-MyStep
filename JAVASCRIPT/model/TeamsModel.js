export default class teamsModel {
    constructor() {
        this.teams = localStorage.teams ? JSON.parse(localStorage.teams) : [];
    }

    getAll() {
        return this.teams;
    }
    create(name, localidade, camisola, total_atletas, membros, logo, owner) {
        const team = {
            id: this.teams.length > 0 ? this.teams[this.teams.length - 1].id + 1 : 1,
            name: name,
            localidade: localidade,
            camisola: camisola,
            total_atletas: total_atletas,
            membros: membros,
            logo: logo,
            owner: owner
        }
        this.teams.push(team);
        this._persist();
    }
    updateMembersTotal(id, name, localidade, camisola, Ntotal_atletas, Nmembros, logo, owner) {
        this.teams = this.teams.filter(team => team.name != name)
        this._persist();
        const team = {
            id: id,
            name: name,
            localidade: localidade,
            camisola: camisola,
            total_atletas: Ntotal_atletas,
            membros: Nmembros,
            logo: logo,
            owner: owner
        }
        this.teams.push(team);
        this._persist();
    }
    remove(name) {
        this.teams = this.teams.filter(team => team.name != name)
        this._persist()
    }

    leaveTeam(id, name, localidade, camisola, total_atletas, nMembros, logo, owner) {
        this.teams = this.teams.filter(team => team.name != name);
        this._persist();
        const team = {
            id: id,
            name: name,
            localidade: localidade,
            camisola: camisola,
            total_atletas: total_atletas,
            membros: nMembros,
            logo: logo,
            owner: owner

        }
        this.teams.push(team);
        this._persist();
    }
    setCurrentTeam(id) {
        localStorage.setItem("current_team", id);
    }

    setUserTeam(id) {
        localStorage.setItem("user_team", id);
    }
    getCurrentTeam() {
        return this.teams.find(team => team.id === +localStorage.current_team)
    }
    getUserTeam() {
        return this.teams.find(team => team.id === +localStorage.user_team)
    }
    _persist() {
        localStorage.setItem('teams', JSON.stringify(this.teams));
    }
}