export default {
    Query: {
        stats: (_, __, { read }) => {
            const orders = read("orders")
            let stat = orders.reduce((acc, el) => acc += +el.totalPrice, 0)
            return {
                daromad: stat
            }
        }
    },
}