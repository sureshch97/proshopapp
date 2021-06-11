import mongoose from 'mongoose'
import Bcrypt from 'bcryptjs'


const userSchema = mongoose.Schema({

    name: {

        type: String,
        required: true
    },
    email: {

        type: String,
        required: true,
        unique: true
    },
    password: {

        type: String,
        required: true
    },
    isAdmin: {

        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await Bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {

    if (!this.isModified('password')) {
        next()
    }

    const salt = await Bcrypt.genSalt(10);
    this.password = await Bcrypt.hash(this.password, salt)

})
const User = mongoose.model('User', userSchema);

export default User