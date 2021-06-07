const authRepository = require('../repositories/authenticate.repository')

const authenticateController = {
    getAuth: async (req, res, next) => {
        try{
            const auth = await authRepository.auth(req.body)
            
            if(auth.error){
                throw new Error(auth.response.data)
            }

            res.cookie('token', auth.data.token, {
                maxAge: 86400 * 1000, // 24 hours
            });
    
            res.cookie('_luaneletro-logged', true, {
                maxAge: 86400 * 1000, // 24 hours
            });
    
            if(auth.data.type === "USER"){
                res.cookie('user-id', auth.data.userId, {
                    maxAge: 86400 * 1000, // 24 hours
                });

                res.cookie('_luaneletro-user-type', auth.data.type, {
                    maxAge: 86400 * 1000, // 24 hours
                });
            }else{
                res.cookie('partner-id', auth.data.userId, {
                    maxAge: 86400 * 1000, // 24 hours
                });

                res.cookie('_luaneletro-user-type', auth.data.type, {
                    maxAge: 86400 * 1000, // 24 hours
                });
            }
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
