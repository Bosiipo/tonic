import {Router} from 'express';
import {ProductController} from '../controllers/product.controller';

export const router = Router();
const productController = new ProductController();

router.get('/', productController.getProducts); // Route for getting all products
router.get('/:productId', productController.getProduct); // Route for getting a specific product by ID

export default router;
