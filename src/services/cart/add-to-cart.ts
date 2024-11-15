// import Product from '../../models/Product.model';
import Redis from 'ioredis';
// import {customAlphabet} from 'nanoid';
import Cart from '../../models/Cart.model';

type addToCartInput = {
  productId: string;
  quantity: number;
  cartId: string;
};

// Connect to Redis
const redis = new Redis();

export const addToCart = async (input: addToCartInput) => {
  const {cartId, productId, quantity} = input;
  const cartKey = `cart:${cartId}`;

  // Fetch cart from Redis cache
  const cart = JSON.parse(await redis.get(cartKey));

  // Update the item quantity in the cart
  const itemIndex = cart.items.findIndex(item => item.productId === productId);
  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({productId, quantity});
  }

  // Update Redis cache with expiration
  await redis.set(cartKey, JSON.stringify(cart), 'EX', 300); // Cache for 5 minutes

  // Update MongoDB asynchronously
  await Cart.findByIdAndUpdate(cartId, {items: cart.items}).exec();

  // Simulate adding to cart (in practice, use user-specific cart session or database)
  return 'Item added to cart!';
};
