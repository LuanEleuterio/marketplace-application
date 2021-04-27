const getHash = (data) => {
    let checkout = new DirectCheckout(
        "D9302B0A5FEA8617943DAB7550CF3AAE16D24205B24567433E383B79F0FF37AB",
        false
    );

    let cardData = {
        cardNumber: "5231098500543453",
        holderName: "Luan E",
        securityCode: "806",
        expirationMonth: "09",
        expirationYear: "2022",
    };

    checkout.getCardHash(
        cardData,
        function (cardHash) {
            console.log(cardHash);
        },
        function (error) {
            console.log(error);
        }
    );
};

export default getHash;
