import loadCards from "./utils/loadCards.js"
import hashCard from "./utils/hashCard.js"
import processing from "./utils/processSpinner.js"
import sweetAlert from "./utils/sweetAlert.js"

async function registerUser(data) {
    
    try {
        const result = await fetch("/user",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if(!result.ok) throw new Error('Falha ao criar usuário! Tente novamente')

        const res = await result.json()

        localStorage.setItem("user-id", res.userId)
        localStorage.setItem("token", res.token)

        sweetAlert.show("Legaaall", "Deu tudo certo!!!.", "success", 3000)
        window.location.href = '/'
    } catch (err) { 
        sweetAlert.show("Opss...", "Ocorreu algum problema, tente novamente", "error", 3000)
    }
}

async function updateUser(data) {
    try {
        const result = await fetch("/user",{
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

async function deleteCard(cardId){
    try {
        const result = await fetch(`/cards/cancel/${cardId}`,{
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })

        if(!result.ok) throw new Error('Falha ao tentar atualizar! Tente novamente')

        return true
    } catch (err) { 
        sweetAlert.show("Opss...", "Ocorreu algum problema, tente novamente", "error", 3000)
        return false
    }
}

async function sendOrders(orders) {
    
    try {
        const result = await fetch(`/orders`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(orders)
        })
        if(!result.ok) throw new Error('Falha ao tentar entrar! Tente novamente')

        const res = await result.json()

        return true
    }catch(err) { 
        sweetAlert.show(
            "Opss...", 
            "Problema ao finalizar pedido, tente novamente",
            "error",
            3000
        )
        return false
    }
}

async function sendCard(cardHash = ''){
    try {
        const result = await fetch("/cards",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(cardHash)
        })

        if(!result.ok) throw new Error('Falha ao tentar cadastar cartão! Tente novamente')
        
        return true

    } catch (err) { 
        sweetAlert.show("Opss...", "Ocorreu algum problema, tente novamente", "error", 3000)
        return false
    }
}

async function cancelItemInOrder(data){
    try{
        const result = await  fetch("/orders/cancel",{
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        })
    }catch(err){
        console.log(err)
    }
}

const user = {
    init: async () => {
        if(location.pathname == '/cards/user'){
            await loadCards.init()
        }
        user.sendUser()
        user.updateUser()
        user.sendCard()
        user.deleteCard()
        user.finalizeOrder()
        user.cancelItemInOrder()
    },
    sendUser: () => {
        const btnSendUser = document.querySelector("#btn-send-user")
        if(btnSendUser != undefined){       
            btnSendUser.addEventListener("click", async (e) => {
                e.preventDefault()

                const fullName = document.querySelector("#fullname")
                const email = document.querySelector("#email")
                const password = document.querySelector("#password")
                const dtNasc = document.querySelector('#dtnasc')
        
                processing.init()

                const body = {
                    name: fullName.value,
                    email: email.value,
                    password: password.value,
                    dtnasc: dtNasc.value,
                }
        
                await registerUser(body)

                processing.finalize()
            })
        }
    },

    updateUser: () => {
        const btnSendUser = document.querySelector("#btn-update-user")
        if(btnSendUser != undefined){
        
            btnSendUser.addEventListener("click", async (e) => {
                e.preventDefault()

                const fullName = document.querySelector("#name")
                const email = document.querySelector("#email")
                const cpf = document.querySelector('#document')
                const phone = document.querySelector('#phone')
                const street = document.querySelector('#street')
                const numberHouse = document.querySelector('#numberHouse')
                const city = document.querySelector('#city')
                const uf = document.querySelector('#state')
                const cep = document.querySelector('#cep')
        
                const body = {
                    name: fullName.value,
                    email: email.value,
                    document: cpf.value,
                    phone: phone.value,
                    address: {
                        street: street.value,
                        number: numberHouse.value,
                        city: city.value,
                        state: uf.value,
                        postCode: cep.value
                    }
                }
        
                await updateUser(body)
            })
        }
    },

    sendCard: async () => {
        const btnSendCard = document.querySelector("#btn-send-card")
        if(btnSendCard != undefined) {
            btnSendCard.addEventListener("click", async (e) => {
                e.preventDefault()
                let cardNumber = document.querySelector("#cardNumber")
                let nameCard = document.querySelector("#nameCard")
                let monthExpire = document.querySelector("#monthExpire")
                let yearExpire = document.querySelector("#yearExpire")
                let securityCode = document.querySelector("#securityCode")
                
                let btnSendSpan = document.querySelector(".btn-send")
                let btnSpinnerSend = document.querySelector(".btn-card-spinner")
        
                btnSendSpan.classList.add('off')
                btnSpinnerSend.classList.remove('off')
        
                let cardData = {
                    cardNumber: cardNumber.value,
                    holderName: nameCard.value,
                    securityCode: securityCode.value,
                    expirationMonth: monthExpire.value,
                    expirationYear: yearExpire.value,
                };
        
                const cardHash = await hashCard.gerenate(cardData)
        
                const body = {
                    creditCardHash: `${cardHash}`,
                    holderName: cardData.holderName
                }
        
                const okCard = await sendCard(body)
        
                if(okCard) await loadCards.init()
        
                btnSendSpan.classList.remove('off')
                btnSpinnerSend.classList.add('off')
        
            })
        }
    },

    deleteCard: () =>{
        const btnDeleteCard = document.querySelectorAll('.btn-delete-card')
        if(btnDeleteCard != undefined){
            for( let btnDelete of btnDeleteCard){
                btnDelete.addEventListener("click", async (e) =>{
                    const okDelete = await deleteCard(btnDelete.attributes[0].value)
                    if(okDelete) await loadCards.init()
                })
            }
        }
        return
    },

    removeEventDeleteCard: () => {
        const btnDeleteCard = document.querySelectorAll('.btn-delete-card')
        if(btnDeleteCard != undefined){
            for( let btnDelete of btnDeleteCard){
                btnDelete.removeEventListener("click")
            }
        }
        return
    },

    finalizeOrder: async () => {
        const btnConfirmOrder = document.querySelector("#btn-confirm-order")

        if(btnConfirmOrder != undefined){
            btnConfirmOrder.addEventListener("click", async (e) => {
                processing.init()

                const finalizeOrder = document.querySelectorAll('.product-item-finalize')
                const radioMethodPay = document.getElementsByName('pay-method')
                
                let paymentMethod
                let card 

                const data = {
                    orders: []
                }

                for( let i = 0; i < radioMethodPay.length; i++){
                    if(radioMethodPay[i].checked){
                        paymentMethod = radioMethodPay[i].value;
                        break;
                    }
                }

                if(paymentMethod === "CREDIT_CARD"){
                    const cardNumber = document.querySelector("#cards")
                    card = cardNumber.options[cardNumber.selectedIndex].value
                }
                
                for(let order of finalizeOrder) {
                    let obj = {}

                    obj.productId = order.attributes[1].value
                    obj.qtd = parseInt(order.attributes[2].value)
                    obj.shippingValue = parseFloat(order.attributes[3].value.replace(",","."))

                    data.orders.push(obj)
                }

                data.discountAmount = "0"
                data.paymentType = paymentMethod
                data.cardId = card != undefined ? card : null

                let ordersOk = await sendOrders(data)

                if(ordersOk){
                    if(localStorage.getItem('from-buy-now')){
                        Cookies.remove('_carrinho-buy-now')
                        localStorage.removeItem('from-buy-now')
                    }else{
                        Cookies.remove('_carrinho-products-luaneletro')
                        Cookies.remove('_carrinho-finalize-order')
                    }
                    processing.finalize()
                    window.location.href = '/orders/user'
                }
                processing.finalize()
            })
        }
    },

    cancelItemInOrder: async () => {
        const btnRemoves = document.querySelectorAll(".btn-remove-item")

        if(btnRemoves != undefined){
            for( let btnRemove of btnRemoves){
                btnRemove.addEventListener("click", async (e) =>{
                    let data = {
                        orderId: btnRemove.attributes[0].value,
                        itemId: btnRemove.attributes[1].value
                    }
                    processing.init()
                    await cancelItemInOrder(data)
                    processing.finalize()

                    window.location.reload()
                })
            }
        }
    }
}
export default user

window.addEventListener("DOMContentLoaded", user.init)
