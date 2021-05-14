const btnSendPartner = document.querySelector("#btn-send-partner")
const btnSendProduct = document.querySelector("#btn-send-product")

function registerPartner(data) {
    try {
        fetch("http://localhost:8081/register-partner",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                localStorage.setItem("partner-id", res.token)
                localStorage.setItem("token", res.token)
            })
            .catch((err) => console.log(err));
    } catch (err) { 
        console.log(err);
    }
}

function registerProduct(data){
    try {
        fetch("http://localhost:8081/product",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
            })
            .catch((err) => console.log(err));
    } catch (err) {console.log(err)}
       
}

if(btnSendPartner != undefined){

    btnSendPartner.addEventListener("click", (e) => {
        const name = document.querySelector('#name')
        const cpf = document.querySelector('#cpf')
        const email = document.querySelector('#email')
        const dtnasc = document.querySelector('#dtnasc')
        const phone = document.querySelector('#phone')
        const lineBusiness = document.querySelector('#line-business')
        const motherName = document.querySelector('#mother-name')
        const rendaMensal = document.querySelector('#renda-mensal')
        const street = document.querySelector('#street')
        const numberHouse = document.querySelector('#number-house')
        const city = document.querySelector('#city')
        const state = document.querySelector('#state')
        const cep = document.querySelector('#cep')
        const bankAgency = document.querySelector('#bank-agency')
        const bankAccount = document.querySelector('#bank-account')
        const accountType = document.querySelector('#account-type')
        const nameOwner = document.querySelector('#name-owner')
        const cpfOwner = document.querySelector('#cpf-owner')
        const password = document.querySelector("#password")
    
        const bankNumber = document.querySelector("#bankNumber")
        let bankCode = bankNumber.options[bankNumber.selectedIndex].value
    
        const businessArea = document.querySelector("#businessArea")
        let businessCode = businessArea.options[businessArea.selectedIndex].value

        e.preventDefault()

        const body = {
            name:name.value,
            document: cpf.value,
            email: email.value,
            birthDate: dtnasc.value,
            phone: phone.value,
            businessArea: parseInt(businessCode),
            linesOfBusiness: lineBusiness.value,
            motherName: motherName.value,
            monthlyIncomeOrRevenue: parseFloat(rendaMensal.value),
            address:{
                street: street.value,
                number: numberHouse.value,
                city: city.value,
                state: state.value,
                postCode: cep.value
            },
            bankAccount:{
            bankNumber: bankCode,
            agencyNumber: bankAgency.value,
            accountNumber: bankAccount.value,
            accountType:"CHECKING",
            accountHolder:{
                name: nameOwner.value,
                document: cpfOwner.value
            }
            },
            password: password.value
        }
        registerPartner(body)
    })
}

if(btnSendProduct != undefined){
    btnSendProduct.addEventListener("click", (e) => {
        const nameProd = document.querySelector('#name-product')
        const descProd = document.querySelector('#description-product')
        const priceProd = document.querySelector('#price-product')
        const imgProd = document.querySelector('#img-url')

        e.preventDefault()

        const body = {
            name: nameProd.value,
            description: descProd.value,
            img_url: imgProd.value,
            price: parseFloat(priceProd.value),
        }

        registerProduct(body)
    })
}

