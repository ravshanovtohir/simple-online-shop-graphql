import { makeExecutableSchema } from "@graphql-tools/schema";

import categoryModule from "./category/index.js"
import productModule from "./products/index.js";


export const schema = makeExecutableSchema({
    typeDefs: [
        categoryModule.typeDefs,
        productModule.typeDefs
    ],
    resolvers: [
        categoryModule.resolvers,
        productModule.resolvers
    ]
})