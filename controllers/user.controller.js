const userRepository = require('../repositories/user.repository')
const partnerRepository = require('../repositories/partner.repository')

const userController = {
    create: async (req, res, next) => {
        let user = await userRepository.register(req.body)

        res.cookie('token', user.data.token, {
            maxAge: 86400 * 1000,
        });

        res.cookie('user-id', user.data._id, {
            maxAge: 86400 * 1000
        });

        return res.json(user.data)
    },
    update: async (req, res, next) => {
        try{
            let token = `Bearer ${req.cookies['token']}`

            let user = await userRepository.update(token, req.body)

            if(user.error){
                throw new Error(user.response.data)
            }
            
            return res.status(200).json(user.data)
        }catch(err){
            return res.status(400).json(err.stack)
        }
    },
    renderRegister: async (req, res, next) => {
        res.render("user/registerUser",{
            layout: "layouts/default"
        })
    },
    renderProfile: async (req, res, next) => {
        let token = `Bearer ${req.cookies['token']}`
        let data = req.cookies['_luaneletro-logged']
        let typeUser = req.cookies['_luaneletro-user-type']
        let logged = false
        console.log(typeUser)
        logged = data == undefined ? false : JSON.parse(data)
        typeUser = typeUser == undefined ? "" : typeUser

        if(logged && typeUser === "USER" ){
            let user = await userRepository.list(token)

            res.render("user/profile", {
                layout: "layouts/user",
                user: user.data.user, 
                logged
            })
        }else{
            res.redirect('/');
        }
    },
}

module.exports = userController;