export default {

    Query: {
        categories: (_, { categoryId }, { read }) => {
            return read("catigories").filter(categorys => categoryId ? categorys.categoryId == categoryId : true)
        }
    },
    Mutation: {
        //mutation Adding new category
        addCategory: (_, { categoryName, userId }, { read, write }) => {
            const categories = read("catigories")
            const users = read("users")

            const user = users.find(el => el.userId == userId)

            if (!user) {
                throw new Error("User not found")
            }
            if (user.role != "admin") {
                throw new Error("YOu are not an admin for that you cant add new category!!!")
            }


            const newCategory = {
                categoryId: categories.length ? +categories.at(-1).categoryId + 1 : 1,
                categoryName
            }

            categories.push(newCategory)
            write("catigories", categories)

            return {
                status: 201,
                message: "The Category added successfully!",
                data: newCategory
            }
        },
        //mutation editing category
        editCategory: (_, { categoryId, categoryName, userId }, { read, write }) => {
            const categories = read("catigories")
            const users = read("users")

            const category = categories.find(el => el.categoryId == categoryId)
            const user = users.find(el => el.userId == userId)


            if (!user) {
                throw new Error("User not found")
            }

            if (!category) {
                throw new Error("With this categoryId category not found")
            }

            if (user.role != "admin") {
                throw new Error("YOu are not an admin for that you cant edit  category!!!")
            }

            if (user.role == "admin") {
                category.categoryName = categoryName
            }

            write("catigories", categories)

            return {
                status: 201,
                message: "The category successfully edited",
                data: category
            }

        },

        //mutation deleting category
        deleteCategory: (_, { categoryId, userId }, { read, write }) => {
            const categories = read("catigories")
            const users = read("users")

            const deletedCategory = categories.find(el => el.categoryId == categoryId)
            const user = users.find(el => el.userId == userId)
            const category = categories.filter(el => el.categoryId != categoryId)

            if (!user) {
                throw new Error("User not found")
            }

            if (!deletedCategory) {
                throw new Error("With this categoryId category not found")
            }

            if (user.role != "admin") {
                throw new Error("YOu are not an admin for that you cant delete category!!!")
            }

            write("catigories", category)

            return {
                status: 201,
                message: "The category successfully deleted",
                data: category
            }
        }
    }


}