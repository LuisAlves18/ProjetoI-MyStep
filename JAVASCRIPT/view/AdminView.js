import UserController from '../controller/UserController.js'

export default class AdminView {
    constructor() {
        this.userController = new UserController();

        this.userController.LoginStatus();
        this.userController.CheckAdminLogin();

        //dom table users
        this.tableUsers = document.getElementById('tableUsers');

        //dom form add admin
        this.AdminName = document.getElementById('AdminName');
        this.frmAddAdmin = document.getElementById('frmAddAdmin');
        this.AdminUsername = document.getElementById('AdminUsername');
        this.AdminEmail = document.getElementById('AdminEmail');
        this.AdminAge = document.getElementById('AdminAge');
        this.AdminPassw = document.getElementById('AdminPassw');
        this.AdminConfpassw = document.getElementById('AdminConfpassw');
        this.errorMessageAdmin = document.getElementById('errorMessageAdmin');

        //valores que vao ficar a none/0
        this.registerAdminCheck = 'true';
        this.stride = "none";
        this.distance = "none";
        this.eventType = "none";
        this.shirt = "none";
        this.shorts = "none";
        this.shoes = "none";
        this.status = "available";
        this.pontos = 0;
        this.eventsCount = 0;
        this.AdminImage = 'OUTROS/download.png';


        //chamar funções
        this.createAdmin();
        this.RenderUsersTable(this.userController.getUsers(), this.userController.LoginStatus());
    }

    createAdmin() {
        this.frmAddAdmin.addEventListener('submit', event => {
            event.preventDefault();

            try {
                if (this.AdminConfpassw.value !== this.AdminPassw.value) {
                    throw Error('Passwords do not match!');
                }
                this.userController.createUser(this.AdminUsername.value, this.AdminName.value, this.AdminPassw.value, this.AdminEmail.value, this.AdminAge.value, this.AdminImage, this.registerAdminCheck, this.stride, this.distance, this.eventType, this.shirt, this.shorts, this.shoes, this.pontos, this.eventsCount, this.status)
                this.displayErrorMessage('Admin added with success!');
                location.reload();
            } catch (error) {
                this.displayErrorMessage(e, 'danger');
            }
        })
    }

    displayErrorMessage(message, type) {
        this.errorMessageAdmin.innerHTML =
            `${message}`;
    }

    AddBindRemoveUser() {
        for (const btnRemove of document.getElementsByClassName("remove")) {
            btnRemove.addEventListener('click', event => {
                this.userController.removeUser(event.target.id)
                this.RenderUsersTable(this.userController.getUsers(), this.userController.LoginStatus())
            })
        }
    }

    AddBindBlockUsers() {
        for (const btnBlock of document.getElementsByClassName("block")) {
            btnBlock.addEventListener('click', event => {
                this.userController.blockUsers(event.target.id)
                this.RenderUsersTable(this.userController.getUsers(), this.userController.LoginStatus())
            })
        }
    }

    AddBindUnBlockUsers() {
        for (const btnBlock of document.getElementsByClassName("unblock")) {
            btnBlock.addEventListener('click', event => {
                this.userController.unblockUsers(event.target.id)
                this.RenderUsersTable(this.userController.getUsers(), this.userController.LoginStatus())
            })
        }
    }

    RenderUsersTable(users = [], username) {
        let result = '';
        result += `<div class="row justify-content-center">
        <table id="tbUser">
            <tr>
                <th> Username </th>
                <th> Admin </th>
                <th> Status </th>
                <th> </th>
            </tr>
    `
        for (const user of users) {
            if (user.username != username) {

                result += this._generateUserTable(user);

            }


        }
        result += `
            </table>
        </div>`

        this.tableUsers.innerHTML = result;
        this.AddBindRemoveUser();
        this.AddBindBlockUsers();
        this.AddBindUnBlockUsers();
    }



    _generateUserTable(user) {
        let html = `
            <tr>
                <td> ${user.username} </td>
                <td> ${user.admin} </td>
                <td> ${user.status} </td>
                <td> <button id="${user.username}" class="btn btn-outline-light remove" style="border-radius: 28px; background-color: #00cc99;"> Remove User </button> `
        if (user.status === "available") {
            html += `<button id="${user.username}" class="btn btn-outline-light block" style="border-radius: 28px; background-color: red;"> Block User </button>
                     
                </td>
                </tr>
            `
        } else {
            html += `<button id="${user.username}" class="btn btn-outline-light unblock" style="border-radius: 28px; background-color: #00cc99;"> Unblock User </button>
                            
                        </td>
                        </tr>
                    `
        }

        return html
    }
}