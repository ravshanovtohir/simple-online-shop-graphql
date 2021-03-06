import { makeExecutableSchema } from "@graphql-tools/schema";

import categoryModule from "./category/index.js"
import productModule from "./products/index.js";
import userModule from "./user/index.js"
import authModule from "./auth/index.js";
import orderModule from "./order/index.js";
import statsModule from "./stats/index.js";


export const schema = makeExecutableSchema({
    typeDefs: [
        categoryModule.typeDefs,
        productModule.typeDefs,
        userModule.typeDefs,
        authModule.typeDefs,
        orderModule.typeDefs,
        statsModule.typeDefs
    ],
    resolvers: [
        categoryModule.resolvers,
        productModule.resolvers,
        userModule.resolvers,
        authModule.resolvers,
        orderModule.resolvers,
        statsModule.resolvers
    ]
})