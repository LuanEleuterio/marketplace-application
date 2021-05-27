const btnAddCarrinho = document.querySelector("#btn-add-carinho")
const btnFinalizeOrder = document.querySelector("#btn-finalize-order")
const quantidadeProduto = document.querySelector("#quantity-product")
const btnRemoveCarrinho = document.querySelectorAll('.btn-remove-carrinho')
const productCarrinho = document.querySelectorAll('.product-carrinho')
const qtdProducts = document.querySelectorAll('.quantity-product')
const priceProducts = document.querySelectorAll('.price-product')
const subtotal = document.querySelector("#subtotal")
const btnCalcFrete = document.querySelector("#btn-calc-frete")

function setPrices(prices){
    let total = 0
    for( let price of prices){
        total += parseFloat(price.attributes[0].value)
    }

    subtotal.innerText = `R$ ${total.toFixed(2)}`
}

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
            }else{
                console.log("Esse produto já está no carrinho")
            }
        }
    })
}

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

if( priceProducts != undefined){
    window.addEventListener("load", (e) => {
        setPrices(priceProducts)
    })
}

if( qtdProducts != undefined){
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

        window.location.href = '/order/checkout'
    })
}

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

        let resCorreios = await fetch(`http://localhost:8080/product/shipping?productId=${productId}&cepDestino=${cep}&productQtd=${qtdProd}`)
        let shippingValue = await resCorreios.json()

        document.querySelector("#streetShipping").innerText = `${addressData.logradouro} - ${addressData.localidade}`
        document.querySelector("#shippingPrazo").innerText = `Entrega em: ${shippingValue.cResultado.Servicos.cServico.PrazoEntrega._text} dia(s)`
        document.querySelector("#shippingValue").innerText = `Valor: R$ ${shippingValue.cResultado.Servicos.cServico.Valor._text}`

        btnSendSpan.classList.remove('off')
        btnSpinnerSend.classList.add('off')
    })
}




   