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
        this.btnjoin = document.querySelector("#join")
        this.joinedMessage = document.getElementById('JoinedMessage');

        this.buttonJoinDisplay();
        this.generateType_dist();
        this.bindJoinRace();
        this.fillEventData();



    }


    buttonJoinDisplay() {
        const currentEvent = this.eventsController.getCurrentEvent();
        this.currentUser = this.userController.LoginStatus();
        let membros = currentEvent.participantes;
        for (let i = 0; i < membros.length; i++) {
            if (membros[i] === this.currentUser) {
                //console.log("entrou no if");
                this.btnjoin.style.display = "none"
                this.joinedMessage.innerHTML = "You are already in this event! Good Luck!"
            }

        }
    }

    bindJoinRace() {
        const currentEvent = this.eventsController.getCurrentEvent()
        this.btnjoin.addEventListener('click', event => {
            event.preventDefault()
            let membros = currentEvent.participantes

            let Nocupacao = currentEvent.ocupacao
            membros.push(this.userController.LoginStatus())
            Nocupacao = membros.length + 1;
            /* this.currentUser = this.userController.LoginStatus();
            this.users = this.userController.getUsers()
            for (const user of users) {
                if (this.currentUser === user.username) {
                    this.points = user.pontos;
                }
            }
            this.points = +13;
            console.log(currentEvent.participantes);
            */
            this.eventsController.updateMembersOcupation(currentEvent.id, currentEvent.name, currentEvent.edicao, currentEvent.localidade, currentEvent.poster, currentEvent.tshirt, currentEvent.medalha, currentEvent.descricao, currentEvent.data_hora, currentEvent.tipos, currentEvent.distancias, currentEvent.capacidade, currentEvent.ocupacao, currentEvent.preco, membros);
        })

    }
    generateType_dist() {
        const currentEvent = this.eventsController.getCurrentEvent()
        const tipos = currentEvent.tipos

        let html = `<div class="row justify-content-start">
                    <span class="text">Type:</span>`

        for (let i = 0; i < tipos.length; i++) {
            //console.log(currentEvent.tipos[i]);

            html += `<p>${tipos[i]},</p>`
        }
        html += ` </div>
        <div class="row justify-content-start"><br>
        <span class="text">Distance:</span>`
        const distancias = currentEvent.distancias
        for (let i = 0; i < distancias.length; i++) {
            //console.log(currentEvent.distancias[i]);

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
        this.eventCap.innerHTML = 'Capacity: ' + currentEvent.ocupacao + '/' + currentEvent.capacidade;
        this.eventType_dist.innerHTML = this.generateType_dist();
    }


}