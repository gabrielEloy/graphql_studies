const {usersArray, profiles} = require('../../../db');

function generateId(arr) {
    return arr.length + 1;
}


module.exports = {
    Query: {
        users: () => usersArray,
        user: (_, args) => {
            return usersArray.find(({id}) => id === args.id)
        },
    },
    Mutation: {
        createUser: (_, { data }) => {

            const alreadyExists = usersArray.some(({email}) => email === data.email);

            if(alreadyExists) {
                throw new Error(`email ${data.email} already exists`);
            }

            const newUser = {...data, id: generateId(usersArray), profile: 2}
            
            usersArray.push(newUser);

            return newUser; 
        },
        updateUser: (_, { id, data }) => {
            const userIndex = usersArray.findIndex(({id: userId}) => userId === id);

            console.log({userIndex})

            if(userIndex === -1){
                throw new Error(`user with id ${id} not found`);
            }

            const user = usersArray[userIndex];
            const editedUser = {...user, ...data};

            //usersArray[userIndex] = editedUser;
            usersArray.splice(userIndex, 1, editedUser);

            return editedUser;
        }
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