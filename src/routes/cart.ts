import {Router} from 'express';
import {CartController} from '../controllers/cart.controller';

export const router = Router();
const cartController = new CartController();

router.get('/add-to-cart', cartController.addToCart); // Route for getting all products
// router.get('/:productId', cartController.removeProduct); // Route for getting a specific product by ID

export default router;
