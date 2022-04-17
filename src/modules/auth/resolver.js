import code from "../../utils/adminRegisterKey.js"
export default {
    Query: {
        login: (_, { username, password }, { read }) => {
            const users = read("users")
            const user = users.filter(el => el.username == username && el.password == password)

            if (!user) {
                throw new Error("Invalid username or password")
            }
            user.map(el => {
                delete el.password
            })

            console.log(user);
            return {
                status: 201,
                message: "User succesfully logged in",
                data: user
            }
        }
    },
    Mutation: {
        register: (_, { username, password, contact, email }, { read, write }) => {

            const users = read("users")

            if (!username) {
                throw new Error("For register please enter username")
            }
            if (!password) {
                throw new Error("For register please enter password")
            }
            if (!contact) {
                throw new Error("For register please enter contact")
            }
            if (!email) {
                throw new Error("For register please enter email")
            }

            const newUser = {
                userId: users.length ? users.at(-1).userId + 1 : 1,
                username,
                password,
                contact,
                email,
                role: "user"
            }

            users.push(newUser)
            write("users", users)

            return {
                status: 201,
                message: "The user registered successfully!",
                data: newUser
            }
        },

        adminRegister: (_, { username, password, contact, email, authCode }, { read, write }) => {

            const users = read("users")


            if (!username) {
                throw new Error("For register please enter username")
            }
            if (!password) {
                throw new Error("For register please enter password")
            }
            if (!contact) {
                throw new Error("For register please enter contact")
            }
            if (!email) {
                throw new Error("For register please enter email")
            }
            if (authCode != code.SECRET_KEY) {
                throw new Error("The codes are not same")
            }

            const newUser = {
                userId: users.length ? users.at(-1).userId + 1 : 1,
                username,
                password,
                contact,
                email,
                role: "admin"
            }

            users.push(newUser)
            write("users", users)

            return {
                status: 201,
                message: "The user registered successfully!",
                data: newUser
            }
        },
    }
}