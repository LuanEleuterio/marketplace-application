const axios = require("axios")

module.exports = async (method, url, data = {}, config = {}) => {
   
    const request = await axios.create({
        baseURL: `http://localhost:8080`,
        headers: config
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
        console.log(err)
    })
}