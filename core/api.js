const axios = require("axios")

module.exports = async (method, url, data = {}, config = {}) => {
    let header = {}
    try{
        config?.authorization ? header["Authorization"] = config.authorization : null
        //http://localhost:8080
        //https://api.luaneletro.shop
        const request = await axios.create({
            baseURL: `http://localhost:8080`,
            headers: header
        })

        let instance;

        switch(method.toLowerCase()){
            case 'get': instance = request.get;         break;
            case 'post': instance = request.post;       break;
            case 'put': instance = request.put;         break;
            case 'patch': instance = request.patch;     break;
            case 'delete': instance = request.delete;   break;
            default: instance = request.get;
        }

        return instance(url, data, config)
        .catch(err => {
            err.error = true
            return err
        })
    }catch(err){
        return err
    }
}