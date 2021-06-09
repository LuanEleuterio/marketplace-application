const hashCard = {
    gerenate: async (cardData) =>{ 
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
    }
}

export default hashCard