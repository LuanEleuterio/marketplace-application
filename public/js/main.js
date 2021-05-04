const subtitulo = document.querySelector("#subtitulo");
import getHash from "./creditHashCode.js";

function getBalance() {
    try {
        fetch("http://localhost:8081/balance")
            .catch((err) => console.log(err));
    } catch (err) {
        console.log(err);
    }
}

function getAuth(){
    const user ={
        user: "luan",
        password: "123"
    }

    try {

        fetch("http://localhost:8081/auth",{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).catch((err) => console.log(err));

    } catch (err) {
        console.log(err);
    }
}

window.addEventListener("load", getAuth);

window.addEventListener("load", () => {
    getHash();
});
