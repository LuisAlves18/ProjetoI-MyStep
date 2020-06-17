export default class TrainingModel {
    constructor() {
        this.trainings = localStorage.trainings ? JSON.parse(localStorage.trainings) : [];
    }

    getAll() {
        return this.trainings;
    }

    create(username, training) {
        const userTraining = {
            username: username,
            training: training
        }
        this.trainings.push(userTraining);
        this._persist();
    }

    _persist() {
        localStorage.setItem('trainings', JSON.stringify(this.trainings));
    }
}