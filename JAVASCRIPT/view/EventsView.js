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
        this.frmAddNewEvent = document.getElementById('frmAddNewEvent')

        this.filterName = document.querySelector('#filterName')

        this.chkRun = document.querySelector('#filterRun')
        this.chkWalk = document.querySelector('#filterWalk')

        this.chk5k = document.querySelector('#filter5k')
        this.chk10k = document.querySelector('#filter10k')
        this.chk21k = document.querySelector('#filter21k')
        this.chk42k = document.querySelector('#filter42k')

        this.btn_filter = document.querySelector('#btn_filter')
        this.btnAddEvent = document.getElementById('btnAddEvent');

        //dom modals
        this.txtEventName = document.getElementById('txtEventName')
        this.btnSearchEventName = document.getElementById('btnSearchEventName')
        this.txtEventNameValue = document.getElementById('txtEventNameValue')
        this.txtEdition = document.getElementById('txtEdition')
        this.txtLocalidade = document.getElementById('txtLocalidade')
        this.txtDescricao = document.getElementById('txtDescricao')
        this.txtDate = document.getElementById('txtDate')
        this.txtTime = document.getElementById('txtTime')
        this.txtCapacity = document.getElementById('txtCapacity')
        this.txtPrice = document.getElementById('txtPrice')
            //input file do poster e da thsirt
        this.txtPoster = document.getElementById('txtPoster')
        this.txtTshirt = document.getElementById('txtTshirt')
            //imagens do poster e tshirt
        this.imgPoster = document.getElementById('imgPoster')
        this.imgTshirt = document.getElementById('imgTshirt')
        this.fivekmCheckBox = document.getElementById('fivekmCheckBox')
        this.tenkmCheckBox = document.getElementById('tenkmCheckBox')
        this.twentyOnekmCheckBox = document.getElementById('twentyOnekmCheckBox')
        this.fourtyTwokmCheckBox = document.getElementById('fourtyTwokmCheckBox')
        this.runCheckBox = document.getElementById('runCheckBox')
        this.walkCheckBox = document.getElementById('walkCheckBox')
        this.errorMessageEvent = document.getElementById('errorMessageEvent')

        this.renderCatalog(this.eventsController.getEvents())
        this.bindAddFilterEvent();
        this.btnAddEventDisplay();
        //this.searchEventName();
        this.bindAddEvent();
        this.showPoster();
        this.showTshirt();



    }

    bindAddFilterEvent() {
        this.btn_filter.addEventListener('click', event => {
            event.preventDefault();
            this.renderCatalog(this.eventsController.getEvents(this.filterName.value, this.chkRun.checked, this.chkWalk.checked, this.chk5k.checked, this.chk10k.checked, this.chk21k.checked, this.chk42k.checked))
        })
    }

    clearInputs() {


        this.txtEventNameValue.value = ""
        this.txtEdition.innerHTML = ""
        this.txtLocalidade.value = ""
        this.txtDescricao.value = ""
        this.txtDate.value =
            this.txtTime.value = ""
        this.txtCapacity.value = ""
        this.txtPrice.value = ""
            //input file do poster e da thsirt
        this.txtPoster.value = ""
        this.txtTshirt.value = ""
            //imagens do poster e tshirt
        this.imgPoster.src = ""
        this.imgTshirt.src = ""
        this.fivekmCheckBox.checked = false
        this.tenkmCheckBox.checked = false
        this.twentyOnekmCheckBox.checked = false
        this.fourtyTwokmCheckBox.checked = false
        this.runCheckBox.checked = false
        this.walkCheckBox.checked = false
        this.errorMessageEvent.value = ""
    }

    /* searchEventName() {
        //this.clearInputs();
        const events = this.eventsController.getEvents();
        this.btnSearchEventName.addEventListener('click', event => {
            event.preventDefault();

            for (const event of events) {
                if (event.name === this.txtEventName.value) {
                    console.log("nome ja existe");
                    this.txtEventNameValue.value = this.txtEventName.value
                    this.txtEdition.innerHTML = event.edicao + 1
                    this.txtLocalidade.value = event.localidade;
                    const distances = event.distancias
                    console.log(distances);
                    
                    if (distances.includes('5K')) {
                        this.fivekmCheckBox.checked = true;
                    }

                    if (distances.includes('10K')) {
                        this.tenkmCheckBox.checked = true;
                        
                    }

                    if(distances.includes('21K')) {
                        this.twentyOnekmCheckBox.checked = true;
                    }

                    if(distances.includes('42K')) {
                        this.fourtyTwokmCheckBox.checked = true;
                    }

                    const types = event.tipos

                    if(types.includes('run')) {
                        this.runCheckBox.checked = true;
                    }

                    if(types.includes('walk')) {
                        this.walkCheckBox.checked = true;
                    }

                    return true;
                }
            }
            console.log("nao existe nenhum nome desse evento");
            this.txtEventNameValue.value = this.txtEventName.value
            this.txtEdition.innerHTML = "1"
            return false;
            
        })
    } */

    bindAddEvent() {
        this.frmAddNewEvent.addEventListener('submit', event => {
            event.preventDefault();

            this.data_hora = this.txtDate.value + "," + this.txtTime.value + "H";
            const distancias = []
            if (this.fivekmCheckBox.checked === true) {
                this.fiveK = "5K"
                distancias.push(this.fiveK);
            }
            if (this.tenkmCheckBox.checked === true) {
                this.tenK = "10K"
                distancias.push(this.tenK);
            }
            if (this.twentyOnekmCheckBox.checked === true) {
                this.twentyOneK = "21K"
                distancias.push(this.twentyOneK);
            }
            if (this.fourtyTwokmCheckBox.checked === true) {
                this.fourtyTwoK = "42K"
                distancias.push(this.fourtyTwoK);
            }

            const tipos = []
            if (this.runCheckBox.checked === true) {
                this.run = "run"
                tipos.push(this.run);
            }
            if (this.walkCheckBox.checked === true) {
                this.walk = "walk";
                tipos.push(this.walk)
            }

            this.tShirt = this.getBase64Image(this.imgTshirt)
            this.poster = this.getBase64Image(this.imgPoster);

            this.ocupacao = 0;
            const participantes = []
            this.edition = 1;


            this.eventsController.createEvent(this.txtEventNameValue.value, this.edition, this.txtLocalidade.value, this.poster, this.tShirt, this.txtDescricao.value, this.data_hora, tipos, distancias, this.txtCapacity.value, this.ocupacao, this.txtPrice.value, participantes);
            location.reload();


        })
    }

    getBase64Image(img) {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        var image = canvas.toDataURL("image/png");

        return image.replace(/^data:image\/(png|jpg);base64,/, "");
    }

    showPoster() {
        this.txtPoster.addEventListener('change', event => {
            const img = this.txtPoster.files[0];
            this.imgPoster.src = window.URL.createObjectURL(img);
        })
    }

    showTshirt() {
        this.txtTshirt.addEventListener('change', event => {
            const img = this.txtTshirt.files[0];
            this.imgTshirt.src = window.URL.createObjectURL(img);
        })
    }

    btnAddEventDisplay() {
        if (sessionStorage.getItem('loggedUser') !== null) {
            this.btnAddEvent.style.display = "none";
        }
    }

    bindAddSeeMoreEvent() {
        for (const btnSee of document.querySelectorAll(".see")) {
            btnSee.addEventListener('click', event => {
                this.eventsController.setCurrentEvent(event.target.id)
                location.href = 'HTML/events-info.html';
            })
        }
    }

    bindAddRemoveEvent() {
        for (const btnRemove of document.getElementsByClassName("remove")) {
            btnRemove.addEventListener('click', event => {
                this.eventsController.removeEvent(event.target.id)
                this.renderCatalog(this.eventsController.getEvents())
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

        this.bindAddRemoveEvent()
        this.bindAddSeeMoreEvent()
    }

    _generateEventCard(prova) {
        var dataImage = this.eventsController.getPhoto(prova.name);
        this.image = "data:image/png;base64," + dataImage;
        let html = `
        <div class="col-sm-12 col-md-6 col-lg-3">
            <div class="card">
                <div class="card-body">`
        if (prova.poster === 'OUTROS/download.png') {
            html += `<img class="card-img-top" src="${prova.poster}" alt="">`
        } else {
            html += `<img class="card-img-top" src="${this.image}" alt="">`
        }
        html += `
                    <h4 class="card-title">${prova.name}</h4>
                    <button id="${prova.id}" class="btn btn-primary see">See more</button>
            `
        if (sessionStorage.getItem('loggedAdmin') !== null) {
            html += `<button id="${prova.name}" class="btn btn-danger remove">Remove</button>
                <button id="${prova.name}" class="btn btn-primary edit">Edit Edition</button>`
        }

        html += `
                </div>
            </div>
        </div>        
        `
        return html
    }



}