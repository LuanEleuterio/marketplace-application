const api = require('../core/api')

const productRepository = {
    create: async (token, body) =>{
        const config = {
            authorization: token
        }
        return await api("POST", "/products", body, config)
    },

    update: async (token, body) => {
        const config = {
            authorization: token
        }
        return await api("PUT", "/products", body, config)
    },

    delete: async (token, productId) => {
        const config = {
            authorization: token
        }
        return await api("DELETE", `/products/${productId}`, {}, config)
    },

    list: async (productId) => {
        return await api("GET", `/products/${productId}`)
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
        `/products/shipping?productId=${productId}&cepDestino=${cepDestino}&productQtd=${productQtd}`)
        return request.data
    }
}

module.exports = productRepository