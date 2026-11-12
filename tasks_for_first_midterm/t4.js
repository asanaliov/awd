function sumSpecialOrders(orders){
    return orders
        .filter(o => o.status === "completed")
        .filter(o => o.items.some(item => item.category === "electronics"))
        .filter(o => o.items.every(item => item.quantity > 0))
        .reduce((total, order) => {
            const orderValue = order.items.reduce((sum, item) => {
                const effectivePrice = item.price * item.quantity * (item.discounted ? 0.5 : 1)
                return sum + effectivePrice;
            }, 0)
            return total + orderValue;
        }, 0)
}