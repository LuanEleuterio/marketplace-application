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
        let data = req.cookies['_luaneletro-logged']
        let typeUser = req.cookies['_luaneletro-user-type']
        let logged = false

        logged = data == undefined ? false : JSON.parse(data)
        typeUser = typeUser == undefined ? "" : typeUser

        if(logged && typeUser === "USER" ){
            res.render("user/cards", {
                layout: "layouts/user",
                logged
            })
        }else{
            res.redirect('/');
        }
    },
    renderPartialsCards: async (req, res, next) =>{
        let token = `Bearer ${req.cookies['token']}`
        let data = req.cookies['_luaneletro-logged']
        let logged = false

        logged = data == undefined ? false : JSON.parse(data)
        
        let cards = await repository.listAll(token)
        
        return res.render("partials/cards", {
            layout: "layouts/none",
            cards: cards.data.cards,
            logged
        })
    }
}

module.exports = userController;