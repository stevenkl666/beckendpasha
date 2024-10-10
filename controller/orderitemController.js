import OrderItem from "../models/orderItemModel.js";
import Order from "../models/orderModel.js";
import Produk from "../models/produkModel.js";

export const getAllOrderItems = async (req, res) => {
    try {
        const orderItems = await OrderItem.findAll({
            include: [Order, Produk]
        });
        res.status(200).json(orderItems);
    } catch (error) {
        res.status(500).json({ message: "Error fetching order items", error: error.message });
    }
};

export const getOrderItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const orderItem = await OrderItem.findByPk(id, {
            include: [Order, Produk]
        });
        if (!orderItem) {
            return res.status(404).json({ message: "Order item not found" });
        }
        res.status(200).json(orderItem);
    } catch (error) {
        res.status(500).json({ message: "Error fetching order item", error: error.message });
    }
};

export const createOrderItem = async (req, res) => {
    try {
        const { order_id, product_id, quantity, price } = req.body;
        const subtotal = quantity * price;
        const newOrderItem = await OrderItem.create({
            order_id,
            product_id,
            quantity,
            price,
            subtotal
        });
        res.status(201).json(newOrderItem);
    } catch (error) {
        res.status(500).json({ message: "Error creating order item", error: error.message });
    }
};

export const updateOrderItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity, price } = req.body;
        const orderItem = await OrderItem.findByPk(id);
        if (!orderItem) {
            return res.status(404).json({ message: "Order item not found" });
        }
        const subtotal = quantity * price;
        const updatedOrderItem = await orderItem.update({
            quantity,
            price,
            subtotal
        });
        res.status(200).json(updatedOrderItem);
    } catch (error) {
        res.status(500).json({ message: "Error updating order item", error: error.message });
    }
};

export const deleteOrderItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await OrderItem.destroy({ where: { id } });
        if (deleted) {
            res.status(200).json({ message: "Order item deleted successfully" });
        } else {
            res.status(404).json({ message: "Order item not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting order item", error: error.message });
    }
};
