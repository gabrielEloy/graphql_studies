const { ApolloServer} = require("apollo-server");
const {resolvers, typeDefs} = require("./src/graphql/modules/index")

const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: err => {
        return new Error(err.message)
    }
});


server.listen();