const email = document.querySelector("#email-login")
const password = document.querySelector("#password-login")
const btnLogin = document.querySelector("#btn-login")
const radioLogin = document.getElementsByName('login')

function login(data) {
    
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
    let userOrPartner;

    for( let i = 0; i< radioLogin.length; i++){
        if(radioLogin[i].checked){
            userOrPartner = radioLogin[i].value;
            break;
        }
    }
    const body = {
        email:`${email.value}`,
        password:`${password.value}`,
        userOrPartner: userOrPartner
    };

    login(body);
})