export default class userModel {
    constructor() {
        this.users = localStorage.users ? JSON.parse(localStorage.users) : [];
    }

    getAll() {
        return this.users;
    }
    //criar um user
    create(username, name, password, email, birth, admin) {
        const user = {
            id: this.users.length > 0 ? this.users[this.users.length - 1].id +1 : 1,
            username: username,
            fullname: name,
            password: password,
            email: email,
            birth: birth,
            admin: admin
        }
        this.users.push(user);
        this._persist();
    }
    //abrir a session storage apos login bem efetuado
    login(loginUsername) {
        sessionStorage.setItem('loggedUser', loginUsername);
    }
    //fechar sessionStorage apos logout
    logout() {
        sessionStorage.removeItem('loggedUser');
    }
    //
    isLogged() {
        return sessionStorage.getItem('loggedUser') !== null ? true : false;
    }

    _persist() {
        localStorage.setItem('users', JSON.stringify(this.users));
    }
}