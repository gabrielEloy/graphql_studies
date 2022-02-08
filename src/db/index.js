module.exports = {
    productsArray:  [
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
    ],
    profiles: [{
        id: 1,
        name: 'admin',
    },
    {
        id: 2,
        name: 'regular',
    }],
    usersArray: [{
        id: 1,
        name: "Gabriel Eloy",
        email: "alalalalla@gmail.com",
        age: 21,
        grossIncome: 32000.52,
        isActive: true,
        profile: 1
    },{
        id: 2,
        name: "Some dude",
        email: "alalalalla@gmail.com",
        age: 32,
        grossIncome: 8200.00,
        isActive: true,
        profile: 2
    }]
}