export default {
    Query: {
        users: (_, { userId }, { read }) => {
            return read("users").filter(users => userId ? users.userId == userId : true)
        }
    },
}