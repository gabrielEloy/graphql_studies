const {gql, ApolloServer} = require("apollo-server");

const usersArray = [{
    id: 1,
    name: "Gabriel Eloy",
    age: 21,
    grossIncome: 32000.52,
    isActive: true,
    profile: 1
},{
    id: 2,
    name: "Some dude",
    age: 32,
    grossIncome: 8200.00,
    isActive: true,
    profile: 2
}]

const profiles = [{
    id: 1,
    name: 'admin',
},
{
    id: 2,
    name: 'regular',
},
]

const productsArray = [
    {
        id: 1,
        price: 23.52,
        name: "Toaster",
        isAvailable: true
    },
    {
        id: 2,
        price: 120.32,
        name: "Microwave",
        isAvailable: true
    },
    {
        id: 3,
        price: 1120.32,
        name: "Computer",
        isAvailable: false
    },
];


const resolvers = {
    User: {
        salary: (obj) => {
            const { grossIncome } = obj;
            
            const taxes = grossIncome * 0.13;
        
            return (grossIncome - taxes).toFixed(2);
        },
        profile: obj => {
            const { profile } = obj;
            return profiles.find(({id}) => id === profile);
        }
    },
    Query: {
        hello: () => "Hello world!",
        users: () => usersArray,
        products: () => productsArray,
        user: (_, args) => {
            return usersArray.find(({id}) => id === args.id)
        },
        product: (_, args) => {
            return productsArray.find(({id}) => id === args.id)
        }
    }
} 
const typeDefs = gql`
    enum ProfileType {
        admin regular
    }

    type Profile {
        id: Int!
        name: ProfileType!
    }

    type User {
        id: ID
        age: Int
        salary: Float
        name: String
        isActive: Boolean
        profile: Profile
    }
    type Product {
        id: ID
        price: Float
        name: String
        isAvailable: Boolean
    }

    type Query {
        hello: String
        users: [User]
        products: [Product]
        user(id: Int): User
        product(id: Int): Product
    }
`


const server = new ApolloServer({
    typeDefs,
    resolvers
});


server.listen();