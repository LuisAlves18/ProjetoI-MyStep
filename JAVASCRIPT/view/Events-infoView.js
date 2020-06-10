import UserController from '../controller/UserController.js'
import EventsController from '../controller/EventsController.js'

export default class EventsInfoView {
    constructor() {
        this.userController = new UserController();
        this.eventsController = new EventsController();
        //verificação para forçar o utilizador a ir para o login caso não haja SessionStorage
        this.userController.LoginStatus();
        this.eventName = document.querySelector('#nome');
        this.eventEdicao = document.querySelector('#edicao');
        this.eventData = document.querySelector('#data');
        this.eventTD = document.querySelector('#td');
        this.eventSlogan = document.querySelector('#slogan');
        this.eventCap = document.querySelector('#cap');
        this.btnBack = document.querySelector("#back");
        this.eventPhoto = document.querySelector("#photo");
        this.eventCap = document.querySelector("#cap");
        this.eventType_dist = document.querySelector("#type_dist")

        this.fillEventData();
        this.generateType_dist();

    }
    generateType_dist() {
        const currentEvent = this.eventsController.getCurrentEvent()
        let html = ``;
        const tipos = currentEvent.tipos
        for (tipo in tipos) {
            html += `<p>${tipo}</p>`
        }
        const distancias = currentEvent.distancias
        for (distancia in distancias) {
            html += `<p>${distancia}</p>`
        }
        return html;
    }

    fillEventData() {
        const currentEvent = this.eventsController.getCurrentEvent()
        this.eventName.innerHTML = currentEvent.name
        this.eventEdicao.innerHTML = 'Edição: ' + currentEvent.edicao
        this.eventSlogan.innerHTML = currentEvent.descricao
        this.eventPhoto.src = currentEvent.poster;
        this.eventData.innerHTML = currentEvent.data_hora;
        this.eventCap.innerHTML = 'Capacity: ' + currentEvent.capacidade;
        this.eventType_dist.innerHTML = this.generateType_dist();
    }


}