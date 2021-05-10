const btnSaldo = document.querySelector('#btn-saldo')
const btnSend = document.querySelector("#btn-charge")
const btnDocuments = document.querySelector('#btn-documents')
const btnPayment = document.querySelector("#btn-send-payment")
const btnToken = document.querySelector("#btn-send-token")

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

function createCharge(data) {
    
    try {
        fetch("http://localhost:8081/charge",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
            })
            .catch((err) => console.log(err));
    } catch (err) {
        console.log(err);
    }
}

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

function sendPayment(data) {
    try {
        fetch("http://localhost:8081/payment",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
            })
            .catch((err) => console.log(err));
    } catch (err) { 
        console.log(err);
    }
}

function cardTokenization(cardHash = ''){
    try {
        fetch("http://localhost:8081/tokenization",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(cardHash)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
            })
            .catch((err) => console.log(err));
    } catch (err) { 
        console.log(err);
    }
}

async function getHash(cardData = {}) {
    let checkout = new DirectCheckout(
        "D9302B0A5FEA8617943DAB7550CF3AAE16D24205B24567433E383B79F0FF37AB",
        false
    );
        
    const getHashCode = (cardData) => new Promise((resolve, reject) => {
        checkout.getCardHash(
            cardData,
            async function (cardHash) {
                resolve(cardHash);
            },
            function (error) {
                reject(error);
        })
        
    });

    return await getHashCode(cardData)
};

btnToken.addEventListener("click", async (e) => {
    e.preventDefault()

    let cardData = {
        cardNumber: "5231098500543453",
        holderName: "Luan E",
        securityCode: "806",
        expirationMonth: "09",
        expirationYear: "2022",
    };

    const cardHash = await getHash(cardData)

    const body = {
        creditCardHash: `${cardHash}`
    }

    cardTokenization(body)
})

btnPayment.addEventListener("click", async (e) => {
    e.preventDefault()

    let cardData = {
        cardNumber: "5231098500543453",
        holderName: "Luan E",
        securityCode: "806",
        expirationMonth: "09",
        expirationYear: "2022",
    };

    //const cardHash = await getHash(cardData)

    const body = {
        chargeId: "chr_24F45D98E6F9595309E75E7A36165D56",
        cardId: "60929c50d39c8e1a48581f0e"
    }

    sendPayment(body)
})

btnSend.addEventListener("click", (e) => {
    e.preventDefault()

    const body = {
        productId: "6092e6fbdfc1453c24d844ac",
        cardId: "6095403a639cfa076c4797c6",
        qtd: "1",
        discountAmount: "0.00",
        paymentType: "CREDIT_CARD"        
    }
    
    createCharge(body)
})
btnDocuments.addEventListener("click", getDocuments)
btnSaldo.addEventListener("click", getBalance)