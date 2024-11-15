import * as yup from 'yup';
import {
  FILTER_CONNECTION_CUSTOMER_PRODUCT,
  METADATA_CUSTOMER_PRODUCTS,
  OperationType,
  ProductQuantityType,
  StatusType,
} from '../services/product';

export const CreateProductSchema = yup.object({
  productName: yup.string().required(),
  productImage: yup.string().required(),
  sellingPrice: yup.number().required(),
  purchasePrice: yup.number().required(),
  type: yup.mixed<ProductQuantityType>().required('Type is required'),
  availableStock: yup.number().required(),
});

export const GetProductSchema = yup.object({
  productId: yup.string().required(),
});

export const GetProductsSchema = yup.object({
  metadata: yup.mixed<METADATA_CUSTOMER_PRODUCTS>(),
  filters: yup.mixed<FILTER_CONNECTION_CUSTOMER_PRODUCT>(),
  searchQuery: yup.string(),
});
