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
            .then(res => {
                if(!res.ok){    
                    throw Error(res.statusText)
                }else{
                    return res.json()
                }
            })
            .then(res => {
                localStorage.setItem("token", res.token)

                if(res.type === "USER"){
                    localStorage.setItem("user-id", res.userId)
                    window.location.href = '/products'
                }else{
                    localStorage.setItem("partner-id", res.userId)
                    if(res.signUpCompleted && res.hasJunoAccount){
                        window.location.href = '/partner/financial'
                    }else{
                        window.location.href = '/partner/profile'
                    }
                    
                }
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