const { ApolloServer} = require("apollo-server");
const {resolvers, typeDefs} = require("./src/modules/index")

const server = new ApolloServer({
    typeDefs,
    resolvers
});


server.listen();