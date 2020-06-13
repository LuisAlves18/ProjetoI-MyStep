export default class userModel {
    constructor() {
        this.users = localStorage.users ? JSON.parse(localStorage.users) : [];
    }

    getAll() {
            return this.users;
        }
        //criar um user
    create(username, name, password, email, birth, image, admin, stride, distance, eventType) {
            const user = {
                id: this.users.length > 0 ? this.users[this.users.length - 1].id + 1 : 1,
                username: username,
                fullname: name,
                password: password,
                email: email,
                birth: birth,
                image: image,
                admin: admin,
                stride: stride,
                distance: distance,
                eventType: eventType
            }
            this.users.push(user);
            this._persist();
        }
        //abrir a session storage apos login bem efetuado para user
    userLogin(loginUsername, id) {
            sessionStorage.setItem('loggedUser', loginUsername);

        }
        //abrir a session storage apos login bem efetuado para admin
    adminLogin(loginUsername, id) {
        sessionStorage.setItem('loggedAdmin', loginUsername);

    }

    //fechar sessionStorage apos logout
    logout() {
            if (sessionStorage.getItem('loggedUser')) {
                sessionStorage.removeItem('loggedUser');
            } else if (sessionStorage.getItem('loggedAdmin')) {
                sessionStorage.removeItem('loggedAdmin');
            }

        }
        //
    isLoggedUser() {
        return sessionStorage.getItem('loggedUser')

    }

    isLoggedAdmin() {
        return sessionStorage.getItem('loggedAdmin')
    }


    _persist() {
        localStorage.setItem('users', JSON.stringify(this.users));
    }

    updatePassword(id, username, name, nPassword, email, birth, image, admin, stride, distance, eventType) {
        this.users = this.users.filter(user => user.username != username)
        this._persist();
        const user = {
            id: id,
            username: username,
            fullname: name,
            password: nPassword,
            email: email,
            birth: birth,
            image: image,
            admin: admin,
            stride: stride,
            distance: distance,
            eventType: eventType
        }
        this.users.push(user);
        this._persist();
    }

    updateEmail(id, username, name, password, nEmail, birth, image, admin, stride, distance, eventType) {
        this.users = this.users.filter(user => user.username != username)
        this._persist();
        const user = {
            id: id,
            username: username,
            fullname: name,
            password: password,
            email: nEmail,
            birth: birth,
            image: image,
            admin: admin,
            stride: stride,
            distance: distance,
            eventType: eventType
        }
        this.users.push(user);
        this._persist();
    }

    updatePhoto(id, username, name, password, email, birth, nImage, admin, stride, distance, eventType) {
        this.users = this.users.filter(user => user.username != username)
        this._persist();
        const user = {
            id: id,
            username: username,
            fullname: name,
            password: password,
            email: email,
            birth: birth,
            image: nImage,
            admin: admin,
            stride: stride,
            distance: distance,
            eventType: eventType
        }
        this.users.push(user);
        this._persist();
    }

    updateRunData(id, username, name, password, email, birth, image, admin, nStride, nDistance, nEventType) {
        this.users = this.users.filter(user => user.username != username)
        this._persist();
        const user = {
            id: id,
            username: username,
            fullname: name,
            password: password,
            email: email,
            birth: birth,
            image: image,
            admin: admin,
            stride: nStride,
            distance: nDistance,
            eventType: nEventType
        }
        this.users.push(user);
        this._persist();
    }
}