const api = require('../core/api')

const authenticateRepository = {
    auth: async (req, res, next) => {
        const body = req.body

        let request = await api("POST", "/auth", body)
        
        if(request.data?.error){
            return request.data.error
        }

        res.cookie('token', request.data.token, {
            maxAge: 86400 * 1000, // 24 hours
            httpOnly: true, // http only, prevents JavaScript cookie access
            secure: true // cookie must be sent over https / ssl
        });

        if(request.data.userOrPartner === "USER"){
            res.cookie('user-id', request.data.userId, {
                maxAge: 86400 * 1000, // 24 hours
                httpOnly: true, // http only, prevents JavaScript cookie access
                secure: true // cookie must be sent over https / ssl
            });
        }else{
            res.cookie('partner-id', request.data.userId, {
                maxAge: 86400 * 1000, // 24 hours
                httpOnly: true, // http only, prevents JavaScript cookie access
                secure: true // cookie must be sent over https / ssl
            });
        }

        return request.data
    }
}

module.exports = authenticateRepository