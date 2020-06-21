import UserController from '../controller/UserController.js'

export default class RankingView {
    constructor() {
        this.userController = new UserController();

        this.rankingTable = document.getElementById('rankingTable');

        this.renderRankingTable(this.userController.getUsers());
    }


    renderRankingTable(users = []) {


        const sortedArray = users.sort((elem1, elem2) => {
            return elem2.pontos - elem1.pontos;
        })

        console.log(sortedArray);



        let result = '';
        result += `<div class="row justify-content-center">
        <table id="tbUser">
            <tr>
                <th> # </th>
                <th> Username </th>
                <th> Points </th>
                <th> Number of Events joinned </th>
            </tr>
    `
        this.topFive = 0;
        for (const user of sortedArray) {
            if ((user.admin !== "true") && (this.topFive < 5)) {
                this.topFive += 1;

                result += this._generateUserTable(user, this.topFive);
            }



        }
        result += `
        </table>
    </div>`
        this.rankingTable.innerHTML = result;


    }

    _generateUserTable(user, position) {
        let html = `
            <tr>
                <td> ${position} </td>
                <td> ${user.username} </td>
                <td> ${user.pontos} </td>
                <td> ${user.eventsCount} </td>
            </tr>
                    `


        return html;
    }
}