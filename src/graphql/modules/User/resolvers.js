const db  = require('../../../db');

function generateId(arr) {
    return arr.length + 1;
}


module.exports = {
    Query: {
        users: () => db.usersArray,
        user: (_, args) => {
            return db.usersArray.find(({id}) => id === args.id)
        },
    },
    Mutation: {
        createUser: (_, { data }) => {

            const alreadyExists = db.usersArray.some(({email}) => email === data.email);

            if(alreadyExists) {
                throw new Error(`email ${data.email} already exists`);
            }

            const newUser = {...data, id: generateId(db.usersArray), profile: 2}
            
            db.usersArray.push(newUser);

            return newUser; 
        },
        updateUser: (_, { id, data }) => {
            const userIndex = db.usersArray.findIndex(({id: userId}) => userId === id);

            if(userIndex === -1){
                throw new Error(`user with id ${id} not found`);
            }

            const user = db.usersArray[userIndex];
            const editedUser = {...user, ...data};

            //db.usersArray[userIndex] = editedUser;
            db.usersArray.splice(userIndex, 1, editedUser);

            return editedUser;
        },
        deleteUser: (_, {id}) => {
            const userIndex = db.usersArray.findIndex(({id: userId}) => userId === id);

            if(userIndex === -1){
                throw new Error(`user with id ${id} not found`);
            }
            const deletedUser = db.usersArray[userIndex];

            db.usersArray = db.usersArray.filter(({id: userId}) => userId !== id);

            return deletedUser;
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
            return db.profiles.find(({id}) => id === profile);
        }
    },
}