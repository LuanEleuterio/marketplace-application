const viacep = {
    init: () => {
        const cep = document.querySelector("#cep")
        
        if(cep != undefined)
            document.querySelector("#cep").addEventListener('blur', viacep.checkCEP)
    },

    checkCEP: async () => {
        const postCode = document.querySelector("#cep")

        if(postCode.value != ""){
            let cep = postCode.value.replace("-", "")

            try{
                fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(data => data.json())
                .then(data => {
                    document.querySelector('#street').value = data.logradouro
                    document.querySelector('#state').value = data.uf
                    document.querySelector('#city').value = data.localidade
                })
                .catch(err => console.log(err))
            }catch(err){
                console.log(err)
            }
        }
    }   
}

window.addEventListener("load", viacep.init)