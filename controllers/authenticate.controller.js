const authRepository = require('../repositories/authenticate.repository')

const authHelper = require('../helpers/auth.helper')

const authenticateController = {
    getAuth: async (req, res, next) => {
        try{
            const auth = await authRepository.auth(req.body)
            
            if(auth.error){
                throw new Error(auth.response.data)
            }

            authHelper.setCookiesAuth(auth.data, res)
           
            res.status(200).json(auth.data)
        }catch(err){
            res.status(400).json(err)
        }
    },
    renderAuth: (req, res, next) => {   
        res.render('authenticate',
        { layout: 'layouts/default' })
    },
    renderAuthUser: (req, res, next) => {
        res.render('authUser',
        { layout: 'layouts/default' })
    },
    renderAuthPartner: (req, res, next) => {
        res.render('authPartner',
        { layout: 'layouts/default' })
    }   
} 

module.exports = authenticateController
