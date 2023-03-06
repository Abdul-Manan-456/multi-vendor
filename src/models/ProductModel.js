const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true
    },
    rating: [Number],
    averageRating: {
        type: Number,
        default: 3.5
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    images: [String],
},
    { timeseries: true });

productSchema.pre('/^find/', function () {
    this.select('__v');
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
