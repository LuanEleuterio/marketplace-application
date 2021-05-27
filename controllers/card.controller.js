const repository = require('../repositories/card.repository')
const gatewayRepository = require('../repositories/gateway.repository')

const userController = {
    create: async (req, res, next) => {
        try{
            let card = await repository.create(req.headers.authorization, req.body)          
            res.json(card.data)
        }catch(err){
            res.json(err)
        }
    },
    delete: async (req, res, next) => {
        let cardDeleted = await repository.delete(req.headers.authorization, req.params.cardId)
        res.json(cardDeleted.data)
    },
    renderCards: async (req, res, next) => {
        let token = `Bearer ${req.cookies['token']}`
        let cards = await repository.listAll(token)

        res.render("user/cards", {cards: cards.data})
    },
    renderPartialsCards: async (req, res, next) =>{
        let token = `Bearer ${req.cookies['token']}`
        let cards = await repository.listAll(token)
        
        return res.render("partials/cards", {cards: cards.data})
    }
}

module.exports = userController;