const btnSaldo = document.querySelector('#btn-saldo')

function getBalance() {
    try {
        fetch("http://localhost:8081/balance",{
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

btnSaldo.addEventListener("click", getBalance)