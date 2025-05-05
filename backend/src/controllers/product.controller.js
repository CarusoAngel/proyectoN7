import {
    createProductService,
    getAllProductsService,
    getProductByIdService,
    updateProductService,
    deleteProductService
  } from '../services/product.service.js';
  
  // Crear nuevo producto
  export const createProduct = async (req, res) => {
    try {
      const imageUrl = `${req.protocol}://${req.get('host')}/uploads/productos/${req.file.filename}`;
      const data = { ...req.body, imagen: imageUrl };
  
      const productCreated = await createProductService(data);
      res.status(201).json({
        message: 'Producto creado correctamente',
        product: productCreated
      });
    } catch (error) {
      res.status(500).json({
        error: 'Error al crear el producto',
        detail: error.message
      });
    }
  };
  
  // Obtener todos los productos
  export const getAllProducts = async (req, res) => {
    try {
      const products = await getAllProductsService();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({
        error: 'Error al obtener los productos',
        detail: error.message
      });
    }
  };
  
  // Obtener un producto por ID
  export const getProductById = async (req, res) => {
    try {
      const product = await getProductByIdService(req.params.id);
      if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({
        error: 'Error al buscar el producto',
        detail: error.message
      });
    }
  };
  
  // Actualizar producto
  export const updateProduct = async (req, res) => {
    try {
      const updated = await updateProductService(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ error: 'Producto no encontrado para actualizar' });
      }
      res.status(200).json({
        message: 'Producto actualizado',
        product: updated
      });
    } catch (error) {
      res.status(500).json({
        error: 'Error al actualizar producto',
        detail: error.message
      });
    }
  };
  
  // Eliminar producto
  export const deleteProduct = async (req, res) => {
    try {
      const deleted = await deleteProductService(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: 'Producto no encontrado para eliminar' });
      }
      res.status(200).json({
        message: 'Producto eliminado',
        product: deleted
      });
    } catch (error) {
      res.status(500).json({
        error: 'Error al eliminar producto',
        detail: error.message
      });
    }
  };
  