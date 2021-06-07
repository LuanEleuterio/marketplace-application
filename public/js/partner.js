import loadProducts from "./utils/loadProducts.js"
import processing from "./utils/processSpinner.js"
import sweetAlert from "./utils/sweetAlert.js"
import upload from "./upload.js"

function registerPartner(data) {
    try {
        fetch("https://luaneletro.shop/partner",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
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
        await fetch("https://luaneletro.shop/product",{
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
        const result = await fetch("https://luaneletro.shop/product",{
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        })

        if(!result.ok) throw new Error('Falha ao tentar atualizar! Tente novamente')
           
        sweetAlert.show("Produto Atualizado!", "", "success", 3000)
    } catch (err) {
        sweetAlert.show("Opss...", "Ocorreu algum problema, tente novamente", "error", 3000)
    }
}

async function updatePartner(data) {
    try {
        const result = await fetch("https://luaneletro.shop/partner",{
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        })
        if(!result.ok) throw new Error('Falha ao tentar atualizar! Tente novamente')

        sweetAlert.show("Atualizado!", "Seus dados foram atualizados.", "success", 3000)
    } catch (err) {
        sweetAlert.show("Opss...", "Ocorreu algum problema, tente novamente", "error", 3000)
    }
}

async function deleteProduct(productId){
    try {
        await fetch(`https://luaneletro.shop/product/${productId}`,{
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
        await fetch("https://luaneletro.shop/digital-account",{
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
        partner.updateBankInfo()
        partner.updateAddressInfo()
        partner.updateProduct()
        partner.deleteProduct()
        partner.sendImage()

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
                e.preventDefault()

                const name = document.querySelector('#name')
                const cpf = document.querySelector('#document')
                const email = document.querySelector('#email')
                const phone = document.querySelector('#phone')
                const lineBusiness = document.querySelector('#linesOfBusiness')
                                    
                const body = {
                    name:name.value,
                    document: cpf.value,
                    email: email.value,
                    phone: phone.value,
                    linesOfBusiness: lineBusiness.value
                }
                await updatePartner(body)
            })
        }
    },

    updateBankInfo: async () => {
        const btnUpdateBank = document.querySelector("#btn-update-bank")
        if(btnUpdateBank != undefined){

            btnUpdateBank.addEventListener("click", async (e) => {
                e.preventDefault()

                const bankAgency = document.querySelector('#agencyBank')
                const bankAccount = document.querySelector('#accountBank')
                const nameOwner = document.querySelector('#ownerBank')
                const cpfOwner = document.querySelector('#cpfOwner')
                
                const bankNumber = document.querySelector("#bankNumber")
                let bankCode = bankNumber.options[bankNumber.selectedIndex].value
        
                const body = {
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

    updateAddressInfo: async () => {
        const btnUpdateAddress = document.querySelector("#btn-update-address")
        if(btnUpdateAddress != undefined){

            btnUpdateAddress.addEventListener("click", async (e) => {
                e.preventDefault()

                const street = document.querySelector('#street')
                const numberHouse = document.querySelector('#numberHouse')
                const city = document.querySelector('#city')
                const state = document.querySelector('#state')
                const cep = document.querySelector('#cep')   
        
                const body = {
                    address:{
                        street: street.value,
                        number: numberHouse.value,
                        city: city.value,
                        state: state.value,
                        postCode: cep.value
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
                const imgProd = document.getElementsByName("product-image")
                const usedOrNo = document.getElementsByName('usedOrNo')
                let used
        
                processing.init()
                
                for( let i = 0; i< usedOrNo.length; i++){
                    if(usedOrNo[i].checked){
                        used = usedOrNo[i].value === "USED" ? true : false
                        break;
                    }
                }
        
                let body = {
                    name: nameProd.value,
                    description: descProd.value,
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

                if(imgProd[0].value.length > 0){
                    body = {
                        img_url: imgProd[0].value,
                        ...body
                    }
                }

                await registerProduct(body)
                
                processing.finalize()

                window.location.href = '/partner/products'
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
                const imgProd = document.querySelector('#upload')
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
    },

    sendImage: async () => {
        const btnImage = document.querySelector("#btn-image")
        const field = document.querySelector("#upload")
        if(btnImage != undefined){
            btnImage.addEventListener("click", (e) => {
                field.click()
            })
        }

        if(field != undefined) {
            field.addEventListener("change", async (e) => {
                let btnSendSpan = document.querySelector(".btn-span-image")
                let btnSpinnerSend = document.querySelector(".btn-spinner-image")
                
                btnSendSpan.classList.add('off')
                btnSpinnerSend.classList.remove('off')

                let res = await upload('upload')
                console.log(res)
                document.querySelector("#image-loaded").src = res.Location
                document.getElementsByName("product-image")[0].value = res.key
                document.querySelector("#image-loaded").classList.remove('off')

                btnSendSpan.classList.remove('off')
                btnSpinnerSend.classList.add('off')
                
            })
        }
    }
}
export default partner

window.addEventListener("DOMContentLoaded", partner.init)

