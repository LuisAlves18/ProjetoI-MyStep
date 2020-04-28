var utilizador = "";
var email = document.querySelector("#email").value;
var btnCreate = document.querySelector("#btnCreate");

btnCreate.addEventListener("click", () => {
    //verificação de se as passwords são iguais
    const passw = document.querySelector("#passw").value;
    const confPassw = document.querySelector("#confpassw").value;
    const email = document.querySelector("#email").value;
    const fname = document.querySelector("#fname").value;
    const lname = document.querySelector("#lname").value;
    const age = document.querySelector("#age").value;
    let users = [];
    if (passw != confPassw) {
        document.querySelector("#error").innerHTML = "*The passwords don't match.";
        return
    } else {
        //passwords são iguais entra aqui

        if (localStorage.getItem("users")) {

            users = JSON.parse(localStorage.getItem("users"));

        }
        for (const user of users) {
            if (user.Email === email) {
                document.querySelector("#error").innerHTML = "*The passwords don't match.";

                return;
            }

        }
        users.push({
            Fname: fname,
            Lname: lname,
            Email: email,
            Birth: age,
            Password: passw
        });
        localStorage.setItem("users",
            JSON.stringify(users)
        )
        event.preventDefault();
    }







})