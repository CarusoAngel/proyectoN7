import { Product } from '../models/Product.js';

export const createProductService = async (data) => {
  const product = new Product(data);
  return await product.save();
};

export const getAllProductsService = async () => {
  return await Product.find().sort({ createdAt: -1 });
};

export const getProductByIdService = async (id) => {
  return await Product.findById(id);
};

export const updateProductService = async (id, data) => {
  return await Product.findByIdAndUpdate(id, data, { new: true });
};

export const deleteProductService = async (id) => {
  return await Product.findByIdAndDelete(id);
};
