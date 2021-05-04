const fullName = document.querySelector("#fullname")
const email = document.querySelector("#email")
const password = document.querySelector("#password")
const btnSend = document.querySelector("#btn-send")

function registerUser(data) {
    
    try {
        fetch("http://localhost:8081/register-user",{
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

btnSend.addEventListener("click", (e) => {
    e.preventDefault()

    const body = {
        name: `${fullName.value}`,
        email:`${email.value}`,
        password:`${password.value}`
    }
    registerUser(body)
})