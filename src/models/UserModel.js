const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/


const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        // required: true,
        trim: true,
        lowercase: true,
        // minLength: [2, 'The name must be greater than 2 letters']
    },
    lname: {
        type: String,
        // required: true,
        trim: true,
        // minLength: [2, 'The name must be greater than 2 letters']
    },
    password: {
        type: String,
        // required: true,
        // select: false,
        // match: [passwordRegex, 'Minimum eight characters, at least one letter and one number']
    },
    email: {
        type: String,
        unique: [true, 'email already exists']
        // required: true,
        // validate: [validator.isEmail, 'invalid email address']
    },
    cellNumber: {
        type: String,
        // required: true,
    },
    profileImage: {
        type: String,
    },
    tokens: [String],
    role: {
        type: String,
        enum: ['admin', 'buyer', 'seller'],
        default: 'admin',
        trim: true,
    },
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    },

    { timestamps: true })



//  virtuals
userSchema.virtual('products', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'user'
})
userSchema.virtual('store', {
    ref: 'Store',
    localField: '_id',
    foreignField: 'user'
})


userSchema.pre(/^find/, function () {
    this.select('-__v')
})


//Hashed the password before saved
userSchema.pre('save', async function (next) {
    try {
        if (this.password && this.isModified('password')) {
            this.password = await bcrypt.hash(this.password, 10)
        }
        next();
    } catch (error) {
        console.log(error)
    }
})

// compare the password
userSchema.methods.passwordCompare = async function (password) {
    return bcrypt.compare(password, this.password)
}




const User = mongoose.model("User", userSchema)
module.exports = User;








// userSchema.pre('validate', function (next) {
//     let user = this;
//     if (user.password !== user.confirmPassword) {
//         return next('Passwords must match');
//     } else {
//         next();
//     }
// });