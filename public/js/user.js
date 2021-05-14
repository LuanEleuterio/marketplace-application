const btnSendUser = document.querySelector("#btn-send-user")
const btnProfileVerCards = document.querySelector('#btn-profile-ver-cards')

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

if(btnSendUser != undefined){
    const fullName = document.querySelector("#fullname")
    const email = document.querySelector("#email")
    const password = document.querySelector("#password")
    const cpf = document.querySelector('#cpf')
    const dtNasc = document.querySelector('#dtnasc')
    const phone = document.querySelector('#phone')
    const street = document.querySelector('#street')
    const numberHouse = document.querySelector('#number-house')
    const city = document.querySelector('#city')
    const uf = document.querySelector('#state')
    const cep = document.querySelector('#cep')

    btnSendUser.addEventListener("click", (e) => {
        e.preventDefault()

        const body = {
            name: fullName.value,
            email: email.value,
            password: password.value,
            document: cpf.value,
            dtnasc: dtNasc.value,
            phone: phone.value,
            address: {
                street: street.value,
                number: numberHouse.value,
                city: city.value,
                state: uf.value,
                postCode: cep.value
            }
        }

        registerUser(body)
    })
}

if(location.pathname == '/profile'){
    window.addEventListener("load", (e) =>{
        try {
            fetch("http://localhost:8081/orders",{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }).catch((err) => console.log(err));
        } catch (err) { 
            console.log(err);
        }
    })
}

if(btnProfileVerCards != undefined) {
    btnProfileVerCards.addEventListener('click', () =>{
        window.location.href = '/user/profile/cards'
    })
}