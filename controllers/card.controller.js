const repository = require('../repositories/card.repository')

const userController = {
    create: async (req, res, next) => {
        try{
            let card = await repository.create(req.headers.authorization, req.body)    

            console.log(card)

            if(card?.response?.data?.error){
                throw new Error(card.response.data)
            }

            res.status(201).json(card.data)
        }catch(err){
            res.status(400).json(err)
        }
    },
    delete: async (req, res, next) => {
        try{
            let cardDeleted = await repository.delete(req.headers.authorization, req.params.cardId)

            if(cardDeleted?.response?.data?.error){
                throw new Error(cardDeleted.response.data)
            }

            res.status(200).json(cardDeleted.data)
        }catch(err){
            res.status(400).json(err)
        }
     
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