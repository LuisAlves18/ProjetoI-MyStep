import EventsModel from '../model/EventsModel.js'
export default class EventsController {
    constructor() {
        this.eventsModel = new EventsModel();
    }
    createEvent(name, edicao, localidade, poster, tshirt, descricao, data_hora, tipos, distancias, capacidade, ocupacao, preco, participantes) {
        if (!this.eventsModel.getAll().some(event => event.name === name)) {
            this.eventsModel.create(name, edicao, localidade, poster, tshirt, descricao, data_hora, tipos, distancias, capacidade, ocupacao, preco, participantes);
        } else {
            throw Error(`The Event with the name "${name}" already exists!`);
        }
    }
    getEvents(filterName, chkRun, chkWalk, chk5k, chk10k, chk21k, chk42k) {
        const events = this.eventsModel.getAll();
        if (filterName === '' && chkRun.checked === false && chkWalk.checked === false && chk5k.checked === false && chk10k.checked === false && chk21k.checked === false && chk42k.checked === false) {
            console.log("entrei");
            return events;
        }
        return events;
    }

    removeEvent(name) {
        this.eventsModel.remove(name)
    }

    updateMembersOcupation(id, name, edicao, localidade, poster, tshirt, descricao, data_hora, tipos, distancias, capacidade, Nocupacao, preco, membros) {
        this.eventsModel.updateMembersOcupation(id, name, edicao, localidade, poster, tshirt, descricao, data_hora, tipos, distancias, capacidade, Nocupacao, preco, membros);

    }
    setCurrentEvent(id) {
        this.eventsModel.setCurrentEvent(id)
    }

    getCurrentEvent() {
        return this.eventsModel.getCurrentEvent()
    }

    getPhoto(eventname) {
        const events = this.eventsModel.getAll();
        for (const event of events) {
            if (event.name === eventname) {
                return event.poster;
            }
        }
    }
}