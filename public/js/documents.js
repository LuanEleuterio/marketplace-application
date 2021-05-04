const btnDocuments = document.querySelector('#btn-documents')

function getDocuments() {
    try {
        fetch("http://localhost:8081/documents",{
            headers:{
                'Authorization':`Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(res => console.log(res))
            .catch((err) => console.log(err));
    } catch (err) {
        console.log(err);
    }
}

btnDocuments.addEventListener("click", getDocuments)