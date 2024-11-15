import mongoose, {Schema} from 'mongoose';

const CartSchema = new Schema(
  {
    items: [{productId: String, quantity: Number}],
    status: {type: String, default: 'active'},
  },
  {timestamps: true}
);

CartSchema.index({createdAt: 1});

const Cart = mongoose.model('Cart', CartSchema);

export default Cart;
