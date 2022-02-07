const {usersArray, profiles} = require('../../db');


module.exports = {
    Query: {
        users: () => usersArray,
        user: (_, args) => {
            return usersArray.find(({id}) => id === args.id)
        },
    },
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
}