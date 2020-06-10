import UserView from '../JAVASCRIPT/view/UserView.js'
import UserViewLogin from '../JAVASCRIPT/view/UserViewLogin.js'
import UserViewRegisto from '../JAVASCRIPT/view/UserViewRegisto.js'
import UserViewLogout from '../JAVASCRIPT/view/UserViewLogout.js'
import UserInfoView from '../JAVASCRIPT/view/UserInfoView.js'
import TrainingView from './view/TrainingView.js'
import EventsView from './view/EventsView.js'
import EventsInfoView from './view/Events-infoView.js'
import TeamsView from './view/TeamsView.js'



class App {
    constructor() {
        this.routes = {
            '': [
                UserView,
                UserViewLogin,
                UserViewRegisto,
                UserViewLogout
            ],
            'registo': [
                UserViewRegisto
            ],
            'login': [
                UserViewLogin
            ],
            'index': [
                UserViewLogout
            ],
            'edit-profile': [
                UserInfoView
            ],
            'training': [
                TrainingView
            ],
            'events': [
                EventsView
            ],
            'events-info': [
                EventsInfoView
            ],
            'teams': [
                TeamsView
            ]

        };

        // import dummy data for testing purposes
        this._importDataFixtures();

        // instantiate the views mapped in the routes object
        this._instantiateViews();
    }

    _instantiateViews() {
        const path = window.location.pathname //http://127.0.0.1:5501/HTML/registo.html
        const file = path.substr(path.lastIndexOf('/') + 1); //registo.html
        const route = file.split('.')[0]; // registo

        const views = this._getViews(route);

        for (const view of views) {
            new view();
        }
    }

    _getViews(route) {
        return typeof this.routes[route] === 'undefined' ? [] : this.routes[route];
    }

    _importDataFixtures() {
        const users = [{
            id: 1,
            username: 'admin',
            fullname: 'Admin Default',
            password: 'admin',
            email: 'admin@myStep.com',
            birth: '22/06/2000',
            admin: 'true'

        }];
        const events = [{
                id: 1,
                name: 'prova ',
                edicao: '3',
                localidade: 'matosas',
                poster: 'OUTROS/download.png',
                tshirt: '',
                medalha: 'medalha',
                descricao: 'a melhor prova para perder peso',
                data_hora: '29 de junho 17h',
                tipo: ['run', 'walk'],
                distacias: ['10K', '21k'],
                capacidade: '3500',
                ocupacao: '100',
                preco: '10'

            },
            {
                id: 2,
                name: 'prova ',
                edicao: '3',
                localidade: 'matosas',
                poster: 'OUTROS/download.png',
                tshirt: '',
                medalha: 'medalha',
                descricao: 'a melhor prova para perder peso',
                data_hora: '29 de junho, 17h',
                tipos: ['run', 'walk'],
                distacias: ['10K', '21k'],
                capacidade: '3500',
                ocupacao: '100',
                preco: '10'

            },
            {
                id: 3,
                name: 'prova ',
                edicao: '3',
                localidade: 'matosas',
                poster: 'OUTROS/download.png',
                tshirt: '',
                medalha: 'medalha',
                descricao: 'a melhor prova para perder peso',
                data_hora: '29 de junho 17h',
                tipos: ['run', 'walk'],
                distacias: ['10K', '21k'],
                capacidade: '3500',
                ocupacao: '100',
                preco: '10'

            }
        ];
        if (!localStorage.users) {
            localStorage.setItem('users', JSON.stringify(users));
        }
        if (!localStorage.events) {
            localStorage.setItem('events', JSON.stringify(events));
        }
    }
}

new App();