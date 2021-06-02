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
        let data = req.cookies['_luaneletro-logged']
        let logged = false

        data = data == undefined ? false : JSON.parse(data)

        if(data === true){
            logged = true
        }

        let cards = await repository.listAll(token)

        res.render("user/cards", {
            layout: "layouts/user",
            cards: cards.data, 
            logged
        })
    },
    renderPartialsCards: async (req, res, next) =>{
        let token = `Bearer ${req.cookies['token']}`
        let data = req.cookies['_luaneletro-logged']
        let logged = false

        data = data == undefined ? false : JSON.parse(data)

        if(data === true){
            logged = true
        }
        
        let cards = await repository.listAll(token)
        
        return res.render("partials/cards", {
            layout: "layouts/none",
            cards: cards.data,
            logged
        })
    }
}

module.exports = userController;