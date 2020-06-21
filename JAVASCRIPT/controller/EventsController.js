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
    getEvents(filterName = '', chkRun = false, chkWalk = false, chk5k = false, chk10k = false, chk21k = false, chk42k = false) {
        const events = this.eventsModel.getAll();
        if (filterName === '' && chkRun === false && chkWalk === false && chk5k === false && chk10k === false && chk21k === false && chk42k === false) {
            console.log("entrei");

            return events;
        }

        let filteredEvents = []

        for (const event of events) {
            let filterEventName = false,
                filterEventChkRun = false,
                filterEventChkWalk = false,
                filterEventChk5k = false,
                filterEventChk10k = false,
                filterEventChk21k = false,
                filterEventChk42k = false

            if ((event.name.includes(filterName) && filterName != '') || filterName === '') {
                filterEventName = true
            }

            if ((event.tipos.includes('run')) || chkRun === false) {
                filterEventChkRun = true
            }

            if ((event.tipos.includes('walk')) || chkWalk === false) {
                filterEventChkWalk = true
            }

            if ((event.distancias.includes('5K')) || chk5k === false) {
                filterEventChk5k = true
            }

            if ((event.distancias.includes('10K')) || chk10k === false) {
                filterEventChk10k = true
            }

            if ((event.distancias.includes('21K')) || chk21k === false) {
                filterEventChk21k = true
            }

            if ((event.distancias.includes('42K')) || chk42k === false) {
                filterEventChk42k = true
            }

            // Alimentar filteredBands
            if (filterEventName && filterEventChkRun && filterEventChkWalk && filterEventChk5k && filterEventChk10k && filterEventChk21k && filterEventChk42k) {
                filteredEvents.push(event)
            }

        }

        return filteredEvents;




        //return events;
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