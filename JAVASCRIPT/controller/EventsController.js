import EventsModel from '../model/EventsModel.js'
export default class EventsController {
    constructor() {
        this.eventsModel = new EventsModel();
    }
    createEvent(name, localidade, poster, tshirt, medalha, descricao, data_hora, tipo, distacia, capacidade, percurso, preco) {
        if (!this.EventModel.getAll().some(event => team.event === event)) {
            this.teamsEvent.create(name, localidade, poster, tshirt, medalha, descricao, data_hora, tipo, distacia, capacidade, percurso, preco);
        } else {
            throw Error(`The Event with the name "${name}" already exists!`);
        }
    }
    getEvents() {
        const events = this.eventsModel.getAll();
        return events;
    }
    setCurrentEvent(id) {
        this.eventsModel.setCurrentEvent(id)
    }

    getCurrentEvent() {
        return this.eventsModel.getCurrentEvent()
    }
}