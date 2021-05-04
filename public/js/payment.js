const btnPayment = document.querySelector("#btn-send-payment")
import getHash from "./creditHashCode.js";

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

btnPayment.addEventListener("click", async (e) => {
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
        chargeId: "chr_D184BF3E87283A00AE839C1F74E4618D",
        billing: {
          email: "luaneleuterio3@gmail.com",
          address: {
            street: "Rua Francisco Sobreira da Silva",
            number: "467",
            city: "São Paulo",
            state: "SP",
            postCode: "04917120"
          },
          delayed: false
        },
        creditCardDetails: {
          creditCardHash: `${cardHash}`
        }
    }

    sendPayment(body)
})