const btnToken = document.querySelector("#btn-send-token")
import getHash from "./creditHashCode.js";

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

    console.log(cardHash)

    const body = {
        creditCardHash: `${cardHash}`
    }

    cardTokenization(body)
})