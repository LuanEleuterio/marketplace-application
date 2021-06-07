import processing from "./utils/processSpinner.js"
import sweetAlert from "./utils/sweetAlert.js"

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
        console.log(res)
        if(res.type === "USER"){
            localStorage.setItem("user-id", res.userId)
            window.location.href = '/'
        }else{
            localStorage.setItem("partner-id", res.userId)
            if(res.signUpCompleted && res.hasJunoAccount){
                //window.location.href = '/partner/financial'
            }else{
                //window.location.href = '/partner/profile'
            }
        }
        
    }catch(err) { 
        sweetAlert.show("Opps...", "Usuário ou senha incorretos", "error", 2000)
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

                const email = document.querySelector("#email-login")
                const password = document.querySelector("#password-login")
                let userOrPartner = "";
            
                processing.init()
                            
                if(window.location.pathname === "/auth/user"){
                    userOrPartner = "USER"
                }else{
                    userOrPartner = "PARTNER"
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
                Cookies.remove('_luaneletro-user-type')
                Cookies.remove('token')
      
                localStorage.removeItem('token')
                localStorage.removeItem('partner-id')
                localStorage.removeItem('user-id')
                window.location.href = "/"
            })
        }
    }
}

window.addEventListener("DOMContentLoaded", auth.init)