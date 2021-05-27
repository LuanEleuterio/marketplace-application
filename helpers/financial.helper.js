const financialHelper = {
    totalSold: async (orders) => {
        let arrOrders = orders
        let total = 0
        for (order of arrOrders){
            if(order.status === "CONCLUDED"){
                total += (order.product.price * order.amount)
            }
        }
        return total 
    },
    expectedSale: async (orders) => {
        let arrOrders = orders
        let total = 0
        for (order of arrOrders){
            if(order.status != "CONCLUDED" && order.status != "CANCELED"){
                total += (order.product.price * order.amount)
            }
        }
        return total.toFixed(2) 
    },
    sales: async (orders) =>{
        const sale = {}
        sale.concludedSales = 0
        sale.expectedSales = 0
        sale.canceledSales = 0

        for (order of orders){
            if(order.status === "CONCLUDED"){
                sale.concludedSales += 1
            }else if(order.status != "CANCELED"){
                sale.expectedSales += 1
            }else{
                sale.canceledSales += 1
            }
        }

        return sale
    }
}

module.exports = financialHelper