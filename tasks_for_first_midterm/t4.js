function sumSpecialOrders(orders){
    return orders
        .filter(o => o.status === "completed")
        .filter(o => o.items.some(item => item.category === "electronics"))
        .filter(o => o.items.every(item => item.quantity > 0))
        .reduce((total, order) => {
            const orderValue = order.items.reduce((sum, item) =>{
                return sum + item.price * item.quantity * (item.discounted ? 0.5 : 1);
            }, 0) ;
            return total + orderValue;
        }, 0)
}

const orders = [
    {
        id: 1,
        status: "completed",
        items: [
            { product: "Laptop",     category: "electronics", price: 1000, quantity: 1, discounted: false },
            { product: "Mouse",      category: "electronics", price: 50,   quantity: 2, discounted: true  },
            { product: "Book",       category: "books",       price: 20,   quantity: 3, discounted: false }
        ]
    },
    {
        id: 2,
        status: "completed",
        items: [
            { product: "Desk",       category: "furniture",   price: 200,  quantity: 1, discounted: false },
            { product: "Chair",      category: "furniture",   price: 150,  quantity: 1, discounted: false }
        ]
    },
    {
        id: 3,
        status: "pending",
        items: [
            { product: "Phone",      category: "electronics", price: 800,  quantity: 1, discounted: false }
        ]
    },
    {
        id: 4,
        status: "completed",
        items: [
            { product: "Headphones", category: "electronics", price: 100,  quantity: 0, discounted: false },
            { product: "USB cable",  category: "electronics", price: 10,   quantity: 2, discounted: false }
        ]
    }
];

console.log(sumSpecialOrders(orders));