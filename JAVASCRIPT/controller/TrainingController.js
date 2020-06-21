import TrainingModel from '../model/TrainingModel.js';

export default class trainingController {
    constructor() {
        this.trainingModel = new TrainingModel();
    }

    addTraining(username, training) {
        this.trainingModel.create(username, training);
    }

    getTrainings() {
        return this.trainingModel.getAll();
    }
}