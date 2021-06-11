import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'suresh',
        email: 'suresh@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'bharath',
        email: 'bharath@gmail.com',
        password: bcrypt.hashSync('123456', 10),

    },
    {
        name: 'pavan',
        email: 'pavan@gmail.com',
        password: bcrypt.hashSync('123456', 10),

    },
]
export default users