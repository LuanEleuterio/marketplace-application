const email = document.querySelector("#email-login")
const password = document.querySelector("#password-login")
const btnLogin = document.querySelector("#btn-login")

function registerUser(data) {
    
    try {
        fetch("http://localhost:8081/auth",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                localStorage.setItem("user-id", res.user._id)
                localStorage.setItem("token", res.token)
            })
            .catch((err) => console.log(err));
    } catch (err) { 
        console.log(err);
    }
}

btnLogin.addEventListener("click", (e) => {
    e.preventDefault()

    const body = {
        email:`${email.value}`,
        password:`${password.value}`
    }
    registerUser(body)
})