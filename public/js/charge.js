const btnSend = document.querySelector("#btn-charge")

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

btnSend.addEventListener("click", (e) => {
    e.preventDefault()

    const body = {
        charge: {
            description: "Skate Tony Hawk Dinnamo",
            amount: 78,
            discountAmount: "0.00",
            paymentTypes: [
                "CREDIT_CARD"
            ],
            paymentAdvance: true,
            split: [
                {
                recipientToken: "8F083AB3AB3238C83690B776ED1AEE03D9363128A957BCD30AA652CC2632344A",
                percentage: 20,
                amountRemainder: true,
                chargeFee: true
                },
                {
                recipientToken: "D72A8BA6CA18C226248A744C6B2FE1F284F5E5F66738761C02328DC9FBE16358",
                percentage: 80,
                amountRemainder: false,
                chargeFee: true
                }
            ]
            },
            billing: {
            name: "Luan E",
            document: "19742710058",
            email: "luaneleuterio3@gmail.com",
            address: {
                street: "Alameda Jauaperi",
                number: "1500",
                city: "São Paulo",
                state: "SP",
                postCode: "04523010"
            }
        }
    }
    
    createCharge(body)
})