const {productsArray} = require('../../db');

module.exports = {
    Query: {
        products: () => productsArray,
        product: (_, args) => {
            return productsArray.find(({id}) => id === args.id)
        }
    }
}