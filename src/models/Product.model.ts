import mongoose, {Schema} from 'mongoose';

const ProductSchema = new Schema(
  {
    productName: {
      type: String,
    },
    productImage: {
      type: String,
    },
    sellingPrice: {type: Number, min: 0},
    availableStock: {type: Number, min: 0, default: 0},
    unitPrice: {type: Number, min: 0},
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE'],
      default: 'ACTIVE',
    },
    updatedAt: {
      type: Date,
    },
    deletedAt: {
      type: Date,
    },
  },
  {timestamps: true}
);

ProductSchema.index({createdAt: 1});

const Product = mongoose.model('Product', ProductSchema);

export default Product;
