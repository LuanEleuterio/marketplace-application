import loadProducts from "./utils/loadProducts.js"

function registerPartner(data) {
    try {
        fetch("http://localhost:8081/partner",{
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
                window.location.href = '/partner/profile'
            })
            .catch((err) => console.log(err));
    } catch (err) { 
        console.log(err);
    }
}

async function registerProduct(data){
    try {
        await fetch("http://localhost:8081/product",{
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

async function updateProduct(data){
    try {
        await fetch("http://localhost:8081/product",{
            method: "PUT",
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
    } catch (err) {
        console.log(err)
    }
}

async function updatePartner(data) {
    try {
        await fetch("http://localhost:8081/partner",{
            method: "PUT",
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
    } catch (err) {
        console.log(err)
    }
}

async function deleteProduct(productId){
    try {
        await fetch(`http://localhost:8081/product/${productId}`,{
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
        })
        .catch((err) => console.log(err));
    } catch (err) {console.log(err)}
}

async function createDigitalAccount(data){
    try {
        await fetch("http://localhost:8081/digital-account",{
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

const partner = {
    init: async () => {
        if(location.pathname == '/partner/products'){
            await loadProducts.init()
        }
        partner.sendPartner()
        partner.createDigitalAccount()
        partner.sendProducts()
        partner.updatePartner()
        partner.updateProduct()
        partner.deleteProduct()
    },
    sendPartner: () => {
        const btnSendPartner = document.querySelector("#btn-send-partner")
        if(btnSendPartner != undefined){

            btnSendPartner.addEventListener("click", (e) => {
                e.preventDefault()

                const name = document.querySelector('#name')
                const email = document.querySelector('#email')
                const phone = document.querySelector('#phone')
                const street = document.querySelector('#street')
                const numberHouse = document.querySelector('#number-house')
                const city = document.querySelector('#city')
                const state = document.querySelector('#state')
                const cep = document.querySelector('#cep')
            
                const body = {
                    name:name.value,
                    email: email.value,
                    phone: phone.value,
                    address:{
                        street: street.value,
                        number: numberHouse.value,
                        city: city.value,
                        state: state.value,
                        postCode: cep.value
                    },
                    password: password.value
                }

                registerPartner(body)
            })
        }
    },

    updatePartner: async () => {
        const btnUpdatePartner = document.querySelector("#btn-update-partner")
        if(btnUpdatePartner != undefined){

            btnUpdatePartner.addEventListener("click", async (e) => {
                const name = document.querySelector('#name')
                const cpf = document.querySelector('#document')
                const email = document.querySelector('#email')
                const phone = document.querySelector('#phone')
                const street = document.querySelector('#street')
                const numberHouse = document.querySelector('#numberHouse')
                const city = document.querySelector('#city')
                const state = document.querySelector('#state')
                const cep = document.querySelector('#cep')   
                const dtnasc = document.querySelector('#dtnasc')
                const lineBusiness = document.querySelector('#linesOfBusiness')
                const motherName = document.querySelector('#mother-name')
                const rendaMensal = document.querySelector('#renda-mensal')
                const bankAgency = document.querySelector('#agencyBank')
                const bankAccount = document.querySelector('#accountBank')
                const nameOwner = document.querySelector('#ownerBank')
                const cpfOwner = document.querySelector('#cpfOwner')
                //const password = document.querySelector("#password")
                
                const bankNumber = document.querySelector("#bankNumber")
                let bankCode = bankNumber.options[bankNumber.selectedIndex].value
            
                //const businessArea = document.querySelector("#businessArea")
                //let businessCode = businessArea.options[businessArea.selectedIndex].value
        
                e.preventDefault()
        
                const body = {
                    name:name.value,
                    document: cpf.value,
                    email: email.value,
                    phone: phone.value,
                    linesOfBusiness: lineBusiness.value,
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
                    }
                }

                await updatePartner(body)
            })
        }
    },

    createDigitalAccount: async () => {
        const btnSendJuno = document.querySelector("#btn-send-juno")
        if(btnSendJuno != undefined){

            btnSendJuno.addEventListener("click", async (e) => {
                e.preventDefault()
                const dtnasc = document.querySelector('#dtnasc')
                const motherName = document.querySelector('#motherName')
                const rendaMensal = document.querySelector('#rendaMensal')
           
                const businessArea = document.querySelector("#businessArea")
                let businessCode = businessArea.options[businessArea.selectedIndex].value
        
        
                const body = {
                    birthDate: dtnasc.value,
                    businessArea: parseInt(businessCode),
                    motherName: motherName.value,
                    monthlyIncomeOrRevenue: parseFloat(rendaMensal.value)
                }

                await createDigitalAccount(body)
            })
        }
    },

    sendProducts: () =>{
        const btnSendProduct = document.querySelector("#btn-send-product")
        if(btnSendProduct != undefined){
            btnSendProduct.addEventListener("click", async (e) => {
                e.preventDefault()
        
                const nameProd = document.querySelector('#nameProd')
                const descProd = document.querySelector('#descriptionProd')
                const priceProd = document.querySelector('#price')
                const imgProd = document.querySelector('#imgUrl')
                const qtdProd = document.querySelector("#quantity")
                const manufacturer = document.querySelector("#manufacturer")
                const marca = document.querySelector("#marca")
                const model = document.querySelector("#model")
                const capacity = document.querySelector("#capacity")
                const color = document.querySelector("#color")
                const weight = document.querySelector("#weight")
                const heightProd = document.querySelector("#heightProd")
                const widthProd = document.querySelector("#widthProd")
                const comprimentoProd = document.querySelector('#comprimentoProd')
                
                const usedOrNo = document.getElementsByName('usedOrNo')
                let used
        
                let btnSendSpan = document.querySelector(".btn-send-prod")
                let btnSpinnerSend = document.querySelector(".btn-product-spinner")
        
                btnSendSpan.classList.add('off')
                btnSpinnerSend.classList.remove('off')
                
                for( let i = 0; i< usedOrNo.length; i++){
                    if(usedOrNo[i].checked){
                        used = usedOrNo[i].value === "USED" ? true : false
                        break;
                    }
                }
        
                const body = {
                    name: nameProd.value,
                    description: descProd.value,
                    img_url: imgProd.value,
                    price: parseFloat(priceProd.value),
                    qtd: parseInt(qtdProd.value),
                    details: {
                        marca: marca.value,
                        manufacturer: manufacturer.value,
                        model: model.value,
                        color: color.value,
                        capacity: capacity.value,
                        weight: weight.value,
                        dimension:{
                            height: heightProd.value,
                            width: widthProd.value,
                            comprimento: comprimentoProd.value
                        }
                    }
                }
                
                await registerProduct(body)

                await loadProducts.init()
                
                btnSendSpan.classList.remove('off')
                btnSpinnerSend.classList.add('off')
            })
        }
    },

    updateProduct: async () => {
        const btnUpdateProduct = document.querySelector("#btn-update-product")
        if(btnUpdateProduct != undefined){
            btnUpdateProduct.addEventListener('click', async (e) => {
                e.preventDefault()

                const productId = btnUpdateProduct.attributes[0].value
                const nameProd = document.querySelector('#nameProd')
                const descProd = document.querySelector('#descriptionProd')
                const priceProd = document.querySelector('#price')
                const imgProd = document.querySelector('#imgUrl')
                const qtdProd = document.querySelector("#quantity")
                const manufacturer = document.querySelector("#manufacturer")
                const marca = document.querySelector("#marca")
                const model = document.querySelector("#model")
                const capacity = document.querySelector("#capacity")
                const color = document.querySelector("#color")
                const weight = document.querySelector("#weight")
                const heightProd = document.querySelector("#heightProd")
                const widthProd = document.querySelector("#widthProd")
                const comprimentoProd = document.querySelector('#comprimentoProd')

                const body = {
                    productId,
                    name: nameProd.value,
                    description: descProd.value,
                    img_url: imgProd.value,
                    price: parseFloat(priceProd.value),
                    qtd: parseInt(qtdProd.value),
                    details: {
                        marca: marca.value,
                        manufacturer: manufacturer.value,
                        model: model.value,
                        color: color.value,
                        capacity: capacity.value,
                        weight: weight.value,
                        dimension:{
                            height: heightProd.value,
                            width: widthProd.value,
                            comprimento: comprimentoProd.value
                        }
                    }
                }
                await updateProduct(body)
            })
        }
    },

    deleteProduct: async () => {
        const btnDeleteProduct = document.querySelectorAll(".btn-delete-prod")
        if(btnDeleteProduct != undefined){
            for(let btnDelete of btnDeleteProduct){
                btnDelete.addEventListener("click", async (e) => {
                    let productId = btnDelete.attributes[0].value
                    await deleteProduct(productId)
                    await loadProducts.init()
                })  
            }
        }
    }
}
export default partner

window.addEventListener("DOMContentLoaded", partner.init)

