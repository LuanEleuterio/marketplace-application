import partner from "../partner.js"

const loadProducts = {
    init: async (reloadProducts) =>{ 
        let itensProducts = document.querySelector("#itens-products")
        let data = await loadProducts.load()

        itensProducts.innerHTML = data

        //Chamo o deleteProduct para criar novamente os Event Listeners
        //de exlusão de products, tendo em vista que o itensProducts recebeu novos elementos
        if(reloadProducts) partner.deleteProduct()
    },

    load: async () =>{
        let response = await fetch('/product/render/partial')
        return await response.text()  
    }
}

export default loadProducts