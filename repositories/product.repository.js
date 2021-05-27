const api = require('../core/api')

const productRepository = {
    create: async (token, body) =>{
        const config = {
            authorization: token
        }
        return await api("POST", "/product", body, config)
    },

    update: async (token, body) => {
        const config = {
            authorization: token
        }
        return await api("PUT", "/product", body, config)
    },

    delete: async (token, productId) => {
        const config = {
            authorization: token
        }
        return await api("DELETE", `/product/${productId}`, {}, config)
    },

    list: async (productId) => {
        return await api("GET", `/product/${productId}`)
    },

    listAll: async () => {
        return await api("GET", "/products")
    },

    listIn: async (body) => {
        return await api("POST", `/products-in`, body)
    },

    listByPartner: async (token) => {
        const config = {
            authorization: token
        }
        return await api("GET", "/products/partner", {}, config)
    },

    calculateShipping: async (productId, productQtd, cepDestino) =>{
        let request = await api("GET", 
        `/product/shipping?productId=${productId}&cepDestino=${cepDestino}&productQtd=${productQtd}`)

        return request.data
    }
}

module.exports = productRepository