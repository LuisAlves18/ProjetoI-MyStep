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

    if (passw != confPassw) {
        document.querySelector("#error").innerHTML = "*The passwords don't match.";
    } else {
        //passwords são iguais entra aqui

        //verificar se ja exite o email do user na localStorage
        if (localStorage.getItem(email) === null) {
            //caso nao exista , cria um novo utilizador no localStorage

            let users = {
                Fname: fname,
                Lname: lname,
                Birth: age,
                Password: passw
            };

            localStorage.setItem(email,
                    JSON.stringify(users)
                )
                //aqui quero pesquisar no local Storage pelo email
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i)
                    //quando o email no input é o mesmo que a key da localStorage
                if (email === key) {
                    //guarda o nome numa variavel
                    utilizador = users.Fname;

                    //agora quero passar esta variavel para um p do index.html
                    window.location.href = "index.html" + utilizador;

                    console.log(`${key} -> ${users.Fname}`);
                }

            }

        } else {
            //se existir dá erro de existencia
            alert("Email already exists");
        }

        //redireciona para a pagina inicial da app
        //window.location.href = "index.html"
    }

})