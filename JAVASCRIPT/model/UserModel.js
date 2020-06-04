export default class userModel {
    constructor() {
        this.users = localStorage.users ? JSON.parse(localStorage.users) : [];
    }

    getAll() {
        return this.users;
    }
    //criar um user
    create(username, name, password, email, birth, image, admin) {
        const user = {
            id: this.users.length > 0 ? this.users[this.users.length - 1].id +1 : 1,
            username: username,
            fullname: name,
            password: password,
            email: email,
            birth: birth,
            image: image,
            admin: admin
        }
        this.users.push(user);
        this._persist();
    }
    //abrir a session storage apos login bem efetuado para user
    userLogin(loginUsername) {
        sessionStorage.setItem('loggedUser', loginUsername);
    }
    //abrir a session storage apos login bem efetuado para admin
    adminLogin(loginUsername) {
        sessionStorage.setItem('loggedAdmin' , loginUsername);
    }

    //fechar sessionStorage apos logout
    logout() {
        if (sessionStorage.getItem('loggedUser')){
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
        if( sessionStorage.getItem('loggedAdmin') !== null){
            return sessionStorage.getItem('loggedAdmin')
        } else {            
            return false;
        }
    }


    _persist() {
        localStorage.setItem('users', JSON.stringify(this.users));
    }
}