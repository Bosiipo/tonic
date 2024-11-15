import {NextFunction, Request, Response} from 'express';
import * as ProductSchema from '../validations/product.schema';
import * as CartService from '../services/cart';
import {validate} from '../middlewares/validate';
import {
  sendFailureResponse,
  sendSuccessResponse,
  StatusCode,
} from '../responses';
import mongoose from 'mongoose';
import Cart from '../models/Cart.model';

export class CartController {
  async addToCart(req: Request, res: Response, next: NextFunction) {
    try {
      let {cartId} = req.body;
      if (!cartId) {
        cartId = new mongoose.Types.ObjectId();
        req.body.cartId = cartId;
      }
      let cart = await Cart.findById(cartId);
      if (!cart) {
        cart = await Cart.create({_id: cartId, items: []});
      }

      const response = await CartService.addToCart(req.body);
      return sendSuccessResponse(
        res,
        StatusCode.CREATED,
        'Product added to cart successfully',
        response
      );
    } catch (error) {
      return next(error);
    }
  }

  async removeProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const params = await validate(ProductSchema.EditProductSchema, {
        productId: req.params.productId,
        productImage: req.body.productImage,
        sellingPrice: req.body.sellingPrice,
        productName: req.body.productName,
        status: req.body.status,
        operation: req.body.operation,
        purchasePrice: req.body.purchasePrice,
        availableStock: req.body.availableStock,
      });
      const response = await CartService.updateProduct(params);
      return sendSuccessResponse(
        res,
        StatusCode.OK,
        'Product updated successfully',
        response
      );
    } catch (error) {
      next(error);
      return sendFailureResponse(
        res,
        StatusCode.BAD_REQUEST,
        (error as Error).message
      );
    }
  }
}
