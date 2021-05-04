const btnSendPartner = document.querySelector("#btn-send-partner")

function registerPartner(data) {
    
    try {
        fetch("http://localhost:8081/register-partner",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                localStorage.setItem("token", res.token)
            })
            .catch((err) => console.log(err));
    } catch (err) { 
        console.log(err);
    }
}

function getBanksAndBusiness(){
    try {
        fetch("http://localhost:8081/bank-business")
            .catch((err) => console.log(err));
    } catch (err) { 
        console.log(err);
    }
}

//window.addEventListener("load", getBanksAndBusiness)

btnSendPartner.addEventListener("click", (e) => {
    e.preventDefault()

    const body = {
        name:"Skate8 Personalizados 27",
        document:"86244578074",
        email:"skate8personalizados17@gmail.com",
        birthDate:"1998-08-01",
        phone:"11939599922",
        businessArea:1011,
        linesOfBusiness:"Vendas de Skates",
        motherName: "Belinda Gates",
        monthlyIncomeOrRevenue: 2500.00,
        address:{
           street:"Rua Dois Corregos",
           number:"333",
           city:"São Paulo",
           state:"SP",
           postCode:"03181020"
        },
        bankAccount:{
           bankNumber:"237",
           agencyNumber:"1299",
           accountNumber:"1878233-2",
           accountType:"CHECKING",
           accountHolder:{
              name:"Bill Gates",
              document:"86244578074"
           }
        },
        password: "1234"
     }
     registerPartner(body)
})