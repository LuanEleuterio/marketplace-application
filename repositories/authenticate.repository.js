const api = require('../core/api')

const authenticateRepository = {
    auth: async (req, res, next) => {
        try{
            const body = req.body

            let request = await api("POST", "/auth", body)
            
            if(request.data?.error){
                res.status(request.status).send(request.data)
            }

            res.cookie('token', request.data.token, {
                maxAge: 86400 * 1000, // 24 hours
                httpOnly: true, // http only, prevents JavaScript cookie access
                secure: true // cookie must be sent over https / ssl
            });

            res.send(request.data)
        }catch(err){
            res.send(err)
        }
    }
}

module.exports = authenticateRepository