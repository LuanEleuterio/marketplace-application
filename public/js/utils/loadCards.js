import user from "../user.js"

const loadCards = {
    init: async () =>{ 
        let itensCards = document.querySelector("#itens-cards")
        let data = await loadCards.load()

        itensCards.innerHTML = data

        //Chamo o deleteCard para criar novamente os Event Listeners
        //de exlusão de cards, tendo em vista que o itensCards recebeu novos elementos
        user.deleteCard()
    },

    load: async () =>{
        let response = await fetch('http://localhost:8081/cards')
        let cards = await response.text()  
        return cards
    }
}

export default loadCards