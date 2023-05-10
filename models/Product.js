import mongoose from "mongoose"

const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String,
        required: [true,'name must be provided'],
        trim: true,
    },
    price: {
        type: Number,
        required: [true,'price must be provided'],
        trim: true,
    },
    featured: {
        type: Boolean,
        default: false,
    },
    company: {
        type: String,
        enum: {
          values: ['ikea', 'liddy', 'caressa', 'marcos'],
          message: '{VALUE} is not supported',
        },
    },
    rating: {
        type: Number, 
        default: 4.5,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
})

const Product = mongoose.model('Products',productSchema)

export default Product