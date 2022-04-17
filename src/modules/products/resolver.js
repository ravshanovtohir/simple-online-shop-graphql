export default {

    Query: {
        products: (_, { productId }, { read }) => {
            return read("products").filter(products => productId ? products.productId == productId : true)
        }
    },
    Mutation: {
        //mutation Adding new category
        addProduct: (_, { userId, categoryId, productName, price, shortDesc, longDesc }, { read, write }) => {

            const users = read("users")
            const products = read("products")
            const categories = read("catigories")

            const user = users.find(el => el.userId == userId)
            const category = categories.find(el => el.categoryId == categoryId)

            if (!user) {
                throw new Error("User not found")
            }

            if (!category) {
                throw new Error("With this categoryId category not found")
            }

            if (user.role != "admin") {
                throw new Error("YOu are not an admin for that you cant add new product!!!")
            }

            if (!productName) {
                throw new Error("For adding new product must be product's name")
            }

            if (!price) {
                throw new Error("For adding new product must be product's price")
            }

            if (!shortDesc) {
                throw new Error("For adding new product must be product's short Description")
            }

            if (!longDesc) {
                throw new Error("For adding new product must be product's long Description")
            }


            const newProduct = {
                productId: products.length ? +products.at(-1).productId + 1 : 1,
                productName,
                price,
                shortDesc,
                longDesc,
                categoryId
            }

            products.push(newProduct)
            write("products", products)

            return {
                status: 201,
                message: "The product added successfully!",
                data: newProduct
            }
        },
        //mutation editing category
        editProduct: (_, { userId, categoryId, productName, price, shortDesc, longDesc, productId }, { read, write }) => {
            const categories = read("catigories")
            const users = read("users")
            const products = read("products")

            const category = categories.find(el => el.categoryId == categoryId)
            const user = users.find(el => el.userId == userId)
            const product = products.find(el => el.productId == productId)


            if (!user) {
                throw new Error("User not found")
            }

            if (!product) {
                throw new Error("With this productId product not found")
            }

            if (user.role != "admin") {
                throw new Error("YOu are not an admin for that you cant edit  category!!!")
            }

            if (user.role == "admin") {
                product.productName = productName ? productName : product.productName
                product.price = price ? price : product.price
                product.shortDesc = shortDesc ? shortDesc : product.shortDesc
                product.longDesc = longDesc ? longDesc : product.longDesc
                product.categoryId = categoryId ? categoryId : product.categoryId
            }

            write("products", products)

            return {
                status: 201,
                message: "The product successfully edited",
                data: product
            }

        },

        //mutation deleting category
        deleteProduct: (_, { productId, userId }, { read, write }) => {
            const users = read("users")
            const products = read("products")

            const user = users.find(el => el.userId == userId)
            const deletedProducts = products.find(el => el.productId == productId)
            const product = products.filter(el => el.productId != productId)


            if (!user) {
                throw new Error("User not found")
            }

            if (!deletedProducts) {
                throw new Error("With this productId product not found")
            }

            if (user.role != "admin") {
                throw new Error("YOu are not an admin for that you cant delete product!!!")
            }

            write("products", product)

            return {
                status: 201,
                message: "The product successfully deleted",
                data: deletedProducts
            }
        }
    }


}