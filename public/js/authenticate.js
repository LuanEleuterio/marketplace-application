import processing from "./utils/processSpinner.js"

async function login(data) {
    
    try {
        const result = await  fetch("https://luaneletro.shop/auth",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        
        if(!result.ok) throw new Error('Falha ao tentar entrar! Tente novamente')

        let res = await result.json()

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
        
    } catch (err) { 
        alert(err.message);
    }
}

const auth = {
    init: () => {
        auth.login()
        auth.logout()
    },

    login: () => {
        const btnLogin = document.querySelector("#btn-login")
        if(btnLogin != undefined){
            btnLogin.addEventListener("click", async (e) => {
                e.preventDefault()

                const radioLogin = document.getElementsByName('login')
                const email = document.querySelector("#email-login")
                const password = document.querySelector("#password-login")
                let userOrPartner;
            
                processing.init()
            
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
            
                await login(body);
            
                processing.finalize()
            })
        }
    },

    logout: () =>{
        const btnLogout = document.querySelector('#btn-logout')

        if(btnLogout != undefined){
            btnLogout.addEventListener('click', async (e) => {
                Cookies.remove('partner-id')
                Cookies.remove('user-id')
                Cookies.remove('_luaneletro-logged')
                Cookies.remove('token')
      
                localStorage.removeItem('token')
                localStorage.removeItem('partner-id')
                localStorage.removeItem('user-id')
                window.location.href = "/products"
            })
        }
    }
}

window.addEventListener("DOMContentLoaded", auth.init)