import { returnDate } from "../../utils/dateModeler.js"
export default {
    Query: {
        orders: (_, { orderId }, { read }) => {
            return read("orders").filter(order => orderId ? order.orderId == orderId : true)
        }
    },

    Mutation: {
        addOrder: (_, { userId, productId, price, count }, { read, write }) => {
            const users = read("users")
            const products = read("products")
            const orders = read("orders")

            const user = users.find(el => el.userId == userId)
            const product = products.find(el => el.productId == productId)

            if (!user) {
                throw new Error("For book order please register")
            }
            if (!product) {
                throw new Error("Product not found")
            }
            if (price > product.price) {
                throw new Error("You are send much more please check")
            }

            const paid = price < product.price

            const newOrder = {
                orderId: orders.length ? orders.at(-1).orderId + 1 : 1,
                userId: +userId,
                productId: +productId,
                isPaid: paid ? false : true,
                orderCreated: returnDate(),
                price,
                count,
                totalPrice: price * count
            }

            orders.push(newOrder)
            write("orders", orders)

            return {
                status: 201,
                message: "The order added",
            }

        }
    }
}