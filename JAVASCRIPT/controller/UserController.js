import UserModel from '../model/UserModel.js'

export default class UserController {
    constructor() {
        this.userModel = new UserModel();
        
    }

    createUser(username, fullname, password, email, birth, image, admin) {
        if (!this.userModel.getAll().some(user => user.username === username)) {
            this.userModel.create(username, fullname, password, email, birth, image, admin);
        } else {
            throw Error(`User with username "${username}" already exists!`);
        }
    }

    loginUser(loginUsername, loginPassword) {
        if (this.userModel.getAll().some(user => {return user.username === loginUsername && user.password === loginPassword && user.admin === "false"})) {
                
                this.userModel.userLogin(loginUsername);
                
                return true;
        } else if (this.userModel.getAll().some(user => {return user.username === loginUsername && user.password === loginPassword && user.admin === "true"})) {
            
            this.userModel.adminLogin(loginUsername);
            return true;
            
        } else {
            throw Error(`Invalid login!`);
        }
    }

    logoutUser() {
        this.userModel.logout();
    }

/*     checkLoginStatus() {
        //sem funcionamento por enquanto
        if (this.person === "user")
        {
            this.name = this.userModel.isLoggedUser();
            return this.name;
        } else if (this.person === "admin") {
            this.name = this.userModel.isLoggedAdmin();
            
            return this.name;
            
            
        }
        
        
       
    } */

    LoginStatus() {
        this.loggedUser = document.getElementById('name');
        if (sessionStorage.getItem('loggedUser')!== null){
            this.personLogged =  sessionStorage.getItem('loggedUser')
            this.loggedUser.innerHTML = this.personLogged
        } else if (sessionStorage.getItem('loggedAdmin')!==null){
            this.personLogged = sessionStorage.getItem('loggedAdmin')
            this.loggedUser.innerHTML = this.personLogged
        } else {
            location.href = '../HTML/login.html';
        }
    }
}