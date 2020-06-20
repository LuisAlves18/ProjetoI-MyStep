export default class userModel {
    constructor() {
        this.users = localStorage.users ? JSON.parse(localStorage.users) : [];
    }

    getAll() {
            return this.users;
        }
        //criar um user
    create(username, name, password, email, birth, image, admin, stride, distance, eventType, shirt, shorts, shoes, pontos, eventsCount, status) {
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
            eventType: eventType,
            shirt: shirt,
            shorts: shorts,
            shoes: shoes,
            pontos: pontos,
            eventsCount: eventsCount,
            status: status
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
    updatePointsEvents(id, username, name, Password, email, birth, image, admin, stride, distance, eventType, shirt, shorts, shoes, nPontos, nEventsCount, status) {
        this.users = this.users.filter(user => user.username != username)
        this._persist();
        const user = {
            id: id,
            username: username,
            fullname: name,
            password: Password,
            email: email,
            birth: birth,
            image: image,
            admin: admin,
            stride: stride,
            distance: distance,
            eventType: eventType,
            shirt: shirt,
            shorts: shorts,
            shoes: shoes,
            pontos: nPontos,
            eventsCount: nEventsCount,
            status: status
        }
        this.users.push(user);
        this._persist();
    }
    updatePassword(id, username, name, nPassword, email, birth, image, admin, stride, distance, eventType, shirt, shorts, shoes, pontos, eventsCount, status) {
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
            eventType: eventType,
            shirt: shirt,
            shorts: shorts,
            shoes: shoes,
            pontos: pontos,
            eventsCount: eventsCount,
            status: status
        }
        this.users.push(user);
        this._persist();
    }

    updateEmail(id, username, name, password, nEmail, birth, image, admin, stride, distance, eventType, shirt, shorts, shoes, pontos, eventsCount, status) {
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
            eventType: eventType,
            shirt: shirt,
            shorts: shorts,
            shoes: shoes,
            pontos: pontos,
            eventsCount: eventsCount,
            status: status
        }
        this.users.push(user);
        this._persist();
    }

    updatePhoto(id, username, name, password, email, birth, nImage, admin, stride, distance, eventType, shirt, shorts, shoes, pontos, eventsCount, status) {
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
            eventType: eventType,
            shirt: shirt,
            shorts: shorts,
            shoes: shoes,
            pontos: pontos,
            eventsCount: eventsCount,
            status: status
        }
        this.users.push(user);
        this._persist();
    }

    updateRunData(id, username, name, password, email, birth, image, admin, nStride, nDistance, nEventType, shirt, shorts, shoes, pontos, eventsCount, status) {
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
            eventType: nEventType,
            shirt: shirt,
            shorts: shorts,
            shoes: shoes,
            pontos: pontos,
            eventsCount: eventsCount,
            status: status
        }
        this.users.push(user);
        this._persist();
    }

    updateEquipmentData(id, username, name, password, email, birth, image, admin, stride, distance, eventType, nShirt, nShorts, nShoes, pontos, eventsCount, status) {
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
            stride: stride,
            distance: distance,
            eventType: eventType,
            shirt: nShirt,
            shorts: nShorts,
            shoes: nShoes,
            pontos: pontos,
            eventsCount: eventsCount,
            status: status

        }
        this.users.push(user);
        this._persist();
    }

    remove(name) {
        this.users = this.users.filter(user => user.username != name)
        this._persist()
    }

    block(id, username, name, password, email, birth, image, admin, stride, distance, eventType, shirt, shorts, shoes, pontos, eventsCount, status) {
        this.users = this.users.filter(user => user.id !== id)
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
            stride: stride,
            distance: distance,
            eventType: eventType,
            shirt: shirt,
            shorts: shorts,
            shoes: shoes,
            pontos: pontos,
            eventsCount: eventsCount,
            status: status
        }
        this.users.push(user);
        this._persist();
    }

}