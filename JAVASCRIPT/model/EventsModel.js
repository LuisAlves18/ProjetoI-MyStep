export default class eventModel {
    constructor() {
        this.events = localStorage.events ? JSON.parse(localStorage.events) : [];
    }

    getAll() {
        return this.events;
    }
    create(name, edicao, localidade, poster, tshirt, descricao, data_hora, tipos, distancias, capacidade, ocupacao, preco, participantes) {
        const event = {
            id: this.events.length > 0 ? this.events[this.events.length - 1].id + 1 : 1,
            name: name,
            edicao: edicao,
            localidade: localidade,
            poster: poster,
            tshirt: tshirt,
            descricao: descricao,
            data_hora: data_hora,
            tipos: tipos,
            distancias: distancias,
            capacidade: capacidade,
            ocupacao: ocupacao,
            preco: preco,
            participantes: participantes
        }
        this.events.push(event);
        this._persist();
    }
    remove(name) {
        this.events = this.events.filter(event => event.name != name)
        this._persist()
    }
    setCurrentEvent(id) {
        localStorage.setItem("current_event", id);
    }
    getCurrentEvent() {
        return this.events.find(event => event.id === +localStorage.current_event)
    }
    _persist() {
        localStorage.setItem('events', JSON.stringify(this.events));
    }
    updateMembersOcupation(id, name, edicao, localidade, poster, tshirt, descricao, data_hora, tipos, distancias, capacidade, Nocupacao, preco, membros) {
        this.events = this.events.filter(event => event.name != name)
        this._persist();
        const event = {
            id: id,
            name: name,
            edicao: edicao,
            localidade: localidade,
            poster: poster,
            tshirt: tshirt,
            descricao: descricao,
            data_hora: data_hora,
            tipos: tipos,
            distancias: distancias,
            capacidade: capacidade,
            ocupacao: Nocupacao,
            preco: preco,
            participantes: membros
        }
        this.events.push(event);
        this._persist();
    }
}