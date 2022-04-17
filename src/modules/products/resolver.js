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
        //     //mutation editing category
        //     editProduct: (_, { categoryId, categoryName, userId }, { read, write }) => {
        //         const categories = read("catigories")
        //         const users = read("users")

        //         const category = categories.find(el => el.categoryId == categoryId)
        //         const user = users.find(el => el.userId == userId)


        //         if (!user) {
        //             throw new Error("User not found")
        //         }

        //         if (!category) {
        //             throw new Error("With this categoryId category not found")
        //         }

        //         if (user.role != "admin") {
        //             throw new Error("YOu are not an admin for that you cant edit  category!!!")
        //         }

        //         if (user.role == "admin") {
        //             category.categoryName = categoryName
        //         }

        //         write("catigories", categories)

        //         return {
        //             status: 201,
        //             message: "The category successfully edited",
        //             data: category
        //         }

        //     },

        //     //mutation deleting category
        //     deleteProduct: (_, { categoryId, userId }, { read, write }) => {
        //         const categories = read("catigories")
        //         const users = read("users")

        //         const deletedCategory = categories.find(el => el.categoryId == categoryId)
        //         const user = users.find(el => el.userId == userId)
        //         const category = categories.filter(el => el.categoryId != categoryId)

        //         if (!user) {
        //             throw new Error("User not found")
        //         }

        //         if (!deletedCategory) {
        //             throw new Error("With this categoryId category not found")
        //         }

        //         if (user.role != "admin") {
        //             throw new Error("YOu are not an admin for that you cant delete category!!!")
        //         }

        //         write("catigories", category)

        //         return {
        //             status: 201,
        //             message: "The category successfully deleted",
        //             data: category
        //         }
        //     }
    }


}