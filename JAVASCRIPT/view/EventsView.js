import EventsController from '../controller/EventsController.js'
import UserController from '../controller/UserController.js'

export default class EventsView {
    constructor() {
        this.eventsController = new EventsController();
        this.userController = new UserController();

        //verificação para forçar o utilizador a ir para o login caso não haja SessionStorage
        this.userController.LoginStatus();
        this.catalog = document.querySelector("#catalog");

        this.Myform = document.querySelector("#myForm")

        this.filterName = document.querySelector('#filterName')

        this.chkRun = document.querySelector('#filterRun')
        this.chkWalk = document.querySelector('#filterWalk')

        this.chk5k = document.querySelector('#filter5k')
        this.chk10k = document.querySelector('#filter10k')
        this.chk21k = document.querySelector('#filter21k')
        this.chk42k = document.querySelector('#filter42k')

        this.btn_filter = document.querySelector('#btn_filter')
        this.renderCatalog(this.eventsController.getEvents())

    }
    bindAddFilterEvent() {
        this.btn_filter.addEventListener('click', () => {

            this.renderCatalog(this.eventsController.getEvents(this.filterName.value, this.chkRun.checked, this.chkWalk.checked, this.chk5k.checked, this.chk10k.checked, this.chk21k.checked, this.chk42k.checked))
        })
    }

    bindAddSeeMoreEvent() {
        for (const btnSee of document.querySelectorAll(".see")) {
            btnSee.addEventListener('click', event => {
                this.eventsController.setCurrentEvent(event.target.id)
                location.href = 'HTML/events-info.html';
            })
        }
    }

    renderCatalog(events = []) {
        let result = ''
        let i = 0
        for (const prova of events) {
            if (i % 3 === 0) { result += `<div class="row justify-content-center">` }
            result += this._generateEventCard(prova)
            i++
            if (i % 3 === 0) { result += `</div>` }
        }

        this.catalog.innerHTML = result
            //this._renderAddEventButton(this.userController.checkLoginStatus());

        //this.bindAddRemoveEvent()
        this.bindAddSeeMoreEvent()
    }

    _generateEventCard(prova) {
        let html = `
        <div class="col-sm-12 col-md-6 col-lg-3">
            <div class="card">
                <div class="card-body">
                <img class="card-img-top" src="${prova.poster}" alt="">
                    <h4 class="card-title">${prova.name}</h4>
                    <button id="${prova.id}" class="btn btn-primary see">See more</button>
            `
            /* if (this.userController.checkLoginStatus()) {
                html += `<button id="${event.name}" class="btn btn-danger remove">Remove</button>`
            } */

        html += `
                </div>
            </div>
        </div>        
        `
        return html
    }



}