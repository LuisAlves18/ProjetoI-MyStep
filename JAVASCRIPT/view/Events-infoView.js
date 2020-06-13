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
        this.generateType_dist();
        this.fillEventData();


    }
    generateType_dist() {
        const currentEvent = this.eventsController.getCurrentEvent()
        const tipos = currentEvent.tipos

        let html = `<div class="row justify-content-start">
                    <span class="text">Type:</span>`

        for (let i = 0; i < tipos.length; i++) {
            console.log(currentEvent.tipos[i]);

            html += `<p>${tipos[i]},</p>`
        }
        html += ` </div>
        <div class="row justify-content-start"><br>
        <span class="text">Distance:</span>`
        const distancias = currentEvent.distancias
        for (let i = 0; i < distancias.length; i++) {
            console.log(currentEvent.distancias[i]);

            html += `<p>${distancias[i]},</p>`
        }
        html += ` </div>`
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