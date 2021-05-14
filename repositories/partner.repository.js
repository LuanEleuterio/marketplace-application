const api = require('../core/api')

const partnerRepository = {
    register: async (req, res, next) => {
        let request = await api("POST", "/partner/register", req.body)

        return request.data
    },
    registerProduct: async (req, res, next) =>{
        const config = {
            authorization: req.headers.authorization
        }
        
        let request = await api("POST", "/product", req.body, config)

        return request.data
    },
    listProducts: async (req, res, next) => {
        let request = await api("GET", "/partner/products")

        if(req?.calledFrom === 'USER'){
            return request.data
        }

        return request.data
    },
    listProduct: async (req, res, next) => {
        let request = await api("GET", `/partner/product/${req.params.productId}`)

        if(req?.calledFrom === 'USER'){
            return request.data
        }

        return request.data
    },
    listPartner: async (req, res, next) => {
        const config = {
            authorization: req.headers.authorization
        }

        let request = await api("GET", "/partner", {}, config)

        return request.data
    }
}

module.exports = partnerRepository