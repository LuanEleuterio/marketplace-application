const authRepository = require('../repositories/authenticate.repository')

const authenticateController = {
    getAuth: async (req, res, next) => {
        try{
            const auth = await authRepository.auth(req, res, next)
            return res.send(auth)
        }catch(err){
            res.send(err)
        }
    },
    renderAuth: (req, res, next) => {   
        res.render('authenticate')
    }   
} 

module.exports = authenticateController
