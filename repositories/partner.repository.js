const api = require('../core/api')

const partnerRepository = {
    register: async (req, res, next) => {
        let request = await api("POST", "/partner", req.body)

        res.cookie('token', request.data.token, {
            maxAge: 86400 * 1000, // 24 hours
            httpOnly: true, // http only, prevents JavaScript cookie access
            secure: true // cookie must be sent over https / ssl
        });

        res.cookie('partner-id', request.data.partnerId, {
            maxAge: 86400 * 1000, // 24 hours
            httpOnly: true, // http only, prevents JavaScript cookie access
            secure: true // cookie must be sent over https / ssl
        });

        return request.data
    },
    updatePartner: async (req, res, next) => {
        const config = {
            authorization: req.headers.authorization
        }
        let request = await api("PUT", "/partner", req.body, config)
        return request.data
    },
    registerProduct: async (req, res, next) =>{
        const config = {
            authorization: req.headers.authorization
        }
        
        let request = await api("POST", "/product", req.body, config)

        return request.data
    },
    updateProduct: async (req, res, next) => {
        const config = {
            authorization: req.headers.authorization
        }
        
        let request = await api("PUT", "/product", req.body, config)

        return request.data
    },
    deleteProduct: async (req, res, next) => {
        const config = {
            authorization: req.headers.authorization
        }
        
        let request = await api("DELETE", `/product/${req.params.productId}`, req.body, config)

        return request.data
    },
    listProducts: async (req, res, next) => {
        let request = await api("GET", "/products")

        return request.data
    },
    listProduct: async (req, res, next) => {
        let request = await api("GET", `/partner/product/${req.params.productId}`)

        return request.data
    },
    listProductsOfPartner: async (req, res, next) => {
        const config = {
            authorization: req.headers.authorization
        }

        let request = await api("GET", "/partner/products", {}, config)

        return request.data
    },
    collectionProduct: async (req, res, next) => {
        let request = await api("POST", `/partner/product/collection`, req.body)

        return request.data
    },
    listPartner: async (req, res, next) => {
        const config = {
            authorization: req.headers.authorization
        }

        let request = await api("GET", "/partner", {}, config)

        return request.data
    },
    listOrders: async (req, res, next) => {
        const config = {
            authorization: req.headers.authorization
        }
        let request = await api("GET", "/partner/orders", {}, config)
    
        return request.data
    },
}

module.exports = partnerRepository