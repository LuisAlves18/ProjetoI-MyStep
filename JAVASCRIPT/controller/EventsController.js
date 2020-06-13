import EventsModel from '../model/EventsModel.js'
export default class EventsController {
    constructor() {
        this.eventsModel = new EventsModel();
    }
    createEvent(name, edicao, localidade, poster, tshirt, medalha, descricao, data_hora, tipos, distancias, capacidade, ocupacao, percurso, preco) {
        if (!this.EventModel.getAll().some(event => team.event === event)) {
            this.teamsEvent.create(name, edicao, localidade, poster, tshirt, medalha, descricao, data_hora, tipos, distancias, capacidade, ocupacao, percurso, preco);
        } else {
            throw Error(`The Event with the name "${name}" already exists!`);
        }
    }
    getEvents(filterName, chkRun, chkWalk, chk5k, chk10k, chk21k, chk42k) {
        const events = this.eventsModel.getAll();
        if (filterName === '' && chkRun.checked == false && chkWalk.checked == false && chk5k.checked == false && chk10k.checked == false && chk21k.checked == false && chk42k.checked == false) {
            console.log("entrei");
            return events;
        }
        return events;
        let filteredEvents = [];


    }
    setCurrentEvent(id) {
        this.eventsModel.setCurrentEvent(id)
    }

    getCurrentEvent() {
        return this.eventsModel.getCurrentEvent()
    }
}