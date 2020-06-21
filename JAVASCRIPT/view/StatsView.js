import TrainingController from '../controller/TrainingController.js';
import UserController from '../controller/UserController.js'

export default class StatsView {
    constructor() {
        this.trainingController = new TrainingController();
        this.userController = new UserController();

        //dom
        this.statsTable = document.getElementById('statsTable');


        //funções
        this.renderTableStats(this.trainingController.getTrainings(), this.userController.LoginStatus());
    }

    renderTableStats(trainings = [], username) {
        let result = '';
        result += `<div class="row justify-content-center">
        <table id="tbUser">
            <tr>
                <th> Username </th>
                <th> Training Distance </th>
                <th> Training Time </th>
            </tr>
    `

        for (const training of trainings) {
            if (training.username === username) {
                result += this._generateTrainingsTable(training);
            }

        }
        result += `
        </table>
    </div>`
        this.statsTable.innerHTML = result;


    }

    _generateTrainingsTable(training) {
        this.newSplit = training.training.split("*");
        this.distance = this.newSplit[0];
        this.time = this.newSplit[1];
        let html = `
            <tr>
                <td> ${training.username} </td>
                <td> ${this.distance} </td>
                <td> ${this.time}
            </tr>
                    `


        return html;
    }
}