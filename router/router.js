import express from 'express';
import * as adminController from '../controller/adminController.js';
import * as userController from '../controller/userController.js';
import * as paymentController from '../controller/paymentController.js';
import * as produkController from '../controller/produkController.js';
import * as orderController from '../controller/orderController.js';
import * as orderItemController from '../controller/orderitemController.js';

const router = express.Router();

// Admin routes
router.post('/admin/register', adminController.registerAdmin);
router.post('/admin/login', adminController.loginAdmin);
router.get('/admin/profile', adminController.getAdminProfile);
router.put('/admin/profile', adminController.updateAdminProfile);
router.delete('/admin/:id', adminController.deleteAdmin);

// User routes
router.post('/users/register', userController.registerUser);
router.post('/users/login', userController.loginUser);
router.get('/users/profile', userController.getUserProfile);
router.put('/users/profile', userController.updateUserProfile);
router.delete('/users/:id', userController.deleteUser);

// Payment routes
router.get('/payments', paymentController.getAllPayments);
router.get('/payments/:id', paymentController.getPaymentById);
router.post('/payments', paymentController.createPayment);
router.put('/payments/:id', paymentController.updatePayment);
router.delete('/payments/:id', paymentController.deletePayment);

// Produk routes
router.get('/produk', produkController.getAllProduk);
router.get('/produk/:id', produkController.getProdukById);
router.post('/produk', produkController.createProduk);
router.put('/produk/:id', produkController.updateProduk);
router.delete('/produk/:id', produkController.deleteProduk);

// Order routes
router.get('/orders', orderController.getAllOrders);
router.get('/orders/:id', orderController.getOrderById);
router.post('/orders', orderController.createOrder);
router.put('/orders/:id', orderController.updateOrder);
router.delete('/orders/:id', orderController.deleteOrder);

// OrderItem routes
router.get('/orderitems', orderItemController.getAllOrderItems);
router.get('/orderitems/:id', orderItemController.getOrderItemById);
router.post('/orderitems', orderItemController.createOrderItem);
router.put('/orderitems/:id', orderItemController.updateOrderItem);
router.delete('/orderitems/:id', orderItemController.deleteOrderItem);

export default router;
