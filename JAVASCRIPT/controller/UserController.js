import UserModel from '../model/UserModel.js'

export default class UserController {
    constructor() {
        this.userModel = new UserModel();

    }

    createUser(username, fullname, password, email, birth, image, admin, stride, distance, eventType) {
        if (!this.userModel.getAll().some(user => user.username === username)) {
            this.userModel.create(username, fullname, password, email, birth, image, admin, stride, distance, eventType);
        } else {
            throw Error(`User with username "${username}" already exists!`);
        }
    }

    loginUser(loginUsername, loginPassword) {
        if (this.userModel.getAll().some(user => { return user.username === loginUsername && user.password === loginPassword && user.admin === "false" })) {

            this.userModel.userLogin(loginUsername);

            return true;
        } else if (this.userModel.getAll().some(user => { return user.username === loginUsername && user.password === loginPassword && user.admin === "true" })) {

            this.userModel.adminLogin(loginUsername);
            return true;

        } else {
            throw Error(`Invalid login!`);
        }
    }

    logoutUser() {
        this.userModel.logout();
    }


    LoginStatus() {
        this.loggedUser = document.getElementById('name');
        this.imageUser = document.getElementById('image');
        if (sessionStorage.getItem('loggedUser') !== null) {
            this.personLogged = sessionStorage.getItem('loggedUser')
            this.loggedUser.innerHTML = this.personLogged
        } else if (sessionStorage.getItem('loggedAdmin') !== null) {
            this.personLogged = sessionStorage.getItem('loggedAdmin')
            this.loggedUser.innerHTML = this.personLogged
        } else {
            location.href = '../HTML/login.html';
        }
    }

    getUserSettings(username) {

        const users = this.userModel.getAll();
        for (const user of users) {
            if (user.username === username) {

                return user.email;
            }
        }
    }

    getPhoto(username) {
        const users = this.userModel.getAll();
        for (const user of users) {
            if (user.username === username) {
                return user.image;
            }
        }
    }

    getName(username) {
        const users = this.userModel.getAll();
        for (const user of users) {
            if (user.username === username) {
                return user.fullname;
            }
        }
    }


    updateEmail(nEmail) {
        if (!this.userModel.getAll().some(user => user.email === nEmail)) {
            for (const user of this.userModel.getAll()) {
                if (sessionStorage.getItem('loggedUser') !== null) {
                    if (sessionStorage.getItem('loggedUser') === user.username) {
                        this.userModel.updateEmail(user.id, user.username, user.fullname, user.password, nEmail, user.birth, user.image, user.admin, user.stride, user.distance, user.eventType)
                    }
                } else if (sessionStorage.getItem('loggedAdmin') !== null) {
                    if (sessionStorage.getItem('loggedUser') === user.username) {
                        this.userModel.updateEmail(user.id, user.username, user.fullname, user.password, nEmail, user.birth, user.image, user.admin, user.stride, user.distance, user.eventType)
                    }
                }
            }
        } else {
            throw Error(`Email : ${nEmail} already exists!`);
        }

    }

    updatePassword(nPassword, nConfPassword) {
        for (const user of this.userModel.getAll()) {
            if (sessionStorage.getItem('loggedUser') !== null) {
                if (sessionStorage.getItem('loggedUser') === user.username) {
                    if (nPassword != user.password) {
                        if (nPassword === nConfPassword) {
                            this.userModel.updateEmail(user.id, user.username, user.fullname, nPassword, user.email, user.birth, user.image, user.admin, user.stride, user.distance, user.eventType)
                        } else {
                            throw Error(`The passwords don't match!`)
                        }
                    } else {
                        throw Error(`Your new password can't be the same as the old.`)
                    }
                }
            } else if (sessionStorage.getItem('loggedAdmin') !== null) {
                if (sessionStorage.getItem('loggedUser') === user.username) {
                    if (nPassword != user.password) {
                        if (nPassword === nConfPassword) {
                            this.userModel.updateEmail(user.id, user.username, user.fullname, nPassword, user.email, user.birth, user.image, user.admin, user.stride, user.distance, user.eventType)
                        } else {
                            throw Error(`The passwords don't match!`)
                        }
                    } else {
                        throw Error(`Your new password can't be the same as the old.`)
                    }
                }
            }
        }
    }

    uploadPhoto(nImage) {
        for (const user of this.userModel.getAll()) {
            if (sessionStorage.getItem('loggedUser') !== null) {
                if (sessionStorage.getItem('loggedUser') === user.username) {
                    this.userModel.updatePhoto(user.id, user.username, user.fullname, user.password, user.email, user.birth, nImage, user.admin, user.stride, user.distance, user.eventType)
                }
            } else if (sessionStorage.getItem('loggedAdmin') !== null) {
                if (sessionStorage.getItem('loggedUser') === user.username) {
                    this.userModel.updatePhoto(user.id, user.username, user.fullname, user.password, user.email, user.birth, nImage, user.admin, user.stride, user.distance, user.eventType)
                }
            }
        }
    }

    updateRunData(nStride, nDistance, nEventType) {
        for (const user of this.userModel.getAll()) {
            if (sessionStorage.getItem('loggedUser') !== null) {
                if (sessionStorage.getItem('loggedUser') === user.username) {
                    this.userModel.updateRunData(user.id, user.username, user.fullname, user.password, user.email, user.birth, user.image, user.admin, nStride, nDistance, nEventType);
                }
            }
        }
    }




    getUserRunData() {
        const users = this.userModel.getAll();
        for (const user of users) {
            if (sessionStorage.getItem('loggedUser') !== null) {
                if (sessionStorage.getItem('loggedUser') === user.username) {
                    return user.stride;
                }
            }
        }
    }



    getUsers() {
        const users = this.userModel.getAll()
        return users;
    }
}