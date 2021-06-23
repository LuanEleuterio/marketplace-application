import sweetAlert from "./utils/sweetAlert.js"

const qtdProducts = document.querySelectorAll('.quantity-product')
const priceProducts = document.querySelectorAll('.price-product')
const subtotal = document.querySelector("#subtotal")

function setPrices(prices){
    if(subtotal != undefined){
        let total = 0
        for( let price of prices){
            total += parseFloat(price.attributes[0].value)
        }
        
        subtotal.innerText = `R$ ${total.toFixed(2)}`
    }
}

if(qtdProducts != undefined){
    for( let qtdProduct of qtdProducts){
        qtdProduct.addEventListener("change", (e) =>{
            let total = 0
            for( let qtdProduct of qtdProducts){
                let qtdProd = parseInt(qtdProduct.options[qtdProduct.selectedIndex].value)
                let priceProd = document.querySelector(`#price-product-${qtdProduct.attributes[0].value}`)
                let price = parseFloat(priceProd.attributes[0].value)

                total += price * qtdProd
            }
            subtotal.innerText = `R$ ${total.toFixed(2)}`
        })
    }
}

if(priceProducts != undefined){
    window.addEventListener("load", (e) => {
        setPrices(priceProducts)
    })
}

const carrinho = {
    init: () => {
        carrinho.addCarrinho()
        carrinho.buyNow()
        carrinho.removeCarrinho()
        carrinho.calculateShipping()
        carrinho.cepRegex()
        carrinho.finalizeOrder()
    },

    addCarrinho: () => {
        const btnAddCarrinho = document.querySelector("#btn-add-carinho")

        if(btnAddCarrinho != undefined) {
            btnAddCarrinho.addEventListener("click", (e) => {
                let data = {
                    products: []
                }
                
                let isInCarrinho = false
                let productId = btnAddCarrinho.attributes[0].value
        
                if(Cookies.get("_carrinho-products-luaneletro")  === undefined){
                    data.products.push({productId: productId})
        
                    Cookies.set("_carrinho-products-luaneletro", JSON.stringify(data), {
                        expires: 1
                    })
        
                    sweetAlert.showAddCarrinho("Produto adicionado ao carrinho", "success")
                }else{
                    const productsJson = Cookies.get("_carrinho-products-luaneletro")
                    data = JSON.parse(productsJson)        
        
        
                    for( let product of data.products){
                        if(productId === product.productId) isInCarrinho = true
                    }
        
                    if(!isInCarrinho){
                        data.products.push({productId: productId})
                        Cookies.set("_carrinho-products-luaneletro", JSON.stringify(data), {
                            expires: 1
                        })
                        sweetAlert.showAddCarrinho("Produto adicionado ao carrinho", "success")
                    }else{
                        sweetAlert.showAddCarrinho("Produto já adicionado no carrinho", "error")
                    }
                }
        
            })
        }
    },

    buyNow: () => {
        const btnBuyNow = document.querySelector("#btn-buy-now")

        if(btnBuyNow != undefined) {
            btnBuyNow.addEventListener("click", (e) => {
                let data = {
                    products: []
                }
                
                let productId = btnBuyNow.attributes[0].value
        
                let priceProd = document.querySelector("#price-prod").attributes[0].value
                let qtdProduct = document.querySelector(`#quantity-product`)
                let qtdProd = parseInt(qtdProduct.options[qtdProduct.selectedIndex].value)
        
                let subtotal = parseFloat(priceProd * qtdProd)
        
                data.subtotal = subtotal
        
                data.products.push({productId: productId, qtd: qtdProd})
        
                let expireInMinutes = new Date(new Date().getTime() + 3 * 60 * 1000)
                Cookies.set("_carrinho-buy-now", JSON.stringify(data), {
                    expires: expireInMinutes
                })
        
                localStorage.setItem("from-buy-now", true)
        
                window.location.href = "/orders/checkout"
            })
        }
    },

    removeCarrinho: () => {
        const btnRemoveCarrinho = document.querySelectorAll('.btn-remove-carrinho')

        if(btnRemoveCarrinho != undefined){
            for( let btnRemove of btnRemoveCarrinho){
                btnRemove.addEventListener("click", (e) =>{
                    let data = {
                        products: []
                    }
                    let newProducts = {
                        products: []
                    }
        
                    const productId = btnRemove.attributes[0].value
            
                    data = JSON.parse(Cookies.get("_carrinho-products-luaneletro"))
                    
                    newProducts.products = data.products.filter((product) => {
                        return product.productId != productId
                    })
                    Cookies.set("_carrinho-products-luaneletro", JSON.stringify(newProducts), {
                        expires: 1
                    })
        
                    window.location.reload()
                })
            }
        }
    },

    calculateShipping: () => {
        const btnCalcFrete = document.querySelector("#btn-calc-frete")
        if(btnCalcFrete != undefined){
            btnCalcFrete.addEventListener("click", async (e) => {
                e.preventDefault()
        
                const cepDestino = document.querySelector("#cepDestino")
                let qtdProduct = document.querySelector(`#quantity-product`)
                const qtdProd = parseInt(qtdProduct.options[qtdProduct.selectedIndex].value)
        
                document.querySelector("#streetShipping").innerText = ""
                document.querySelector("#shippingPrazo").innerText = ""
                document.querySelector("#shippingValue").innerText = ""
        
                let productId = btnCalcFrete.attributes[0].value
                let cep = cepDestino.value.replace("-", "")
        
                let btnSendSpan = document.querySelector(".btn-span-frete")
                let btnSpinnerSend = document.querySelector(".btn-spinner-frete")
        
                btnSendSpan.classList.add('off')
                btnSpinnerSend.classList.remove('off')
        
                let resViacep = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
                let addressData = await  resViacep.json()
        
                let resCorreios = await fetch(`/product/shipping?productId=${productId}&cepDestino=${cep}&productQtd=${qtdProd}`)
                let shippingValue = await resCorreios.json()
        
                document.querySelector("#streetShipping").innerText = `${addressData.logradouro} - ${addressData.localidade}`
                document.querySelector("#shippingPrazo").innerText = `Entrega em: ${shippingValue.shippingValue.cResultado.Servicos.cServico.PrazoEntrega._text} dia(s)`
                document.querySelector("#shippingValue").innerText = `Valor: R$ ${shippingValue.shippingValue.cResultado.Servicos.cServico.Valor._text}`
        
                btnSendSpan.classList.remove('off')
                btnSpinnerSend.classList.add('off')
            })
        }
    },

    finalizeOrder: () => {
        const btnFinalizeOrder = document.querySelector("#btn-finalize-order")
        if( btnFinalizeOrder != undefined){
            btnFinalizeOrder.addEventListener("click", (e) => {
                const productsItens = document.querySelectorAll('.product-carrinho')

                let data = {
                    products: []
                }
        
                for(let product of productsItens){
                    const productId = product.attributes[0].value
                    let last4NumberProdId = productId.substr(19)
                    let qtdProduct = document.querySelector(`#quantity-product-${last4NumberProdId}`)
                    
                    let qtdProd = parseInt(qtdProduct.options[qtdProduct.selectedIndex].value)
        
                    data.products.push({productId: productId, qtd: qtdProd})
                }
        
                let totalValue = subtotal.textContent.split(" ")[1]
                data.subtotal = totalValue
        
                Cookies.set("_carrinho-finalize-order", JSON.stringify(data), {
                    expires: 1
                })
        
                window.location.href = '/orders/checkout'
            })
        }
    },

    cepRegex: () => {
        const cepDestino = document.querySelector("#cepDestino")

        if(cepDestino != undefined){
            //let reg = new RegExp("^[0-9]{5})-?([0-9]{3}$")
            cepDestino.addEventListener("keyup", (e) => {
                //console.log(e.target)
            })
        }
    }
}

window.addEventListener("DOMContentLoaded", carrinho.init)




   