import Order from "../models/orderModel.js";
import OrderItem from "../models/orderItemModel.js";

// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({ include: OrderItem });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat mengambil semua pesanan",
      error: error.message,
    });
  }
};

// Get a single order by ID
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id, { include: OrderItem });
    if (!order) {
      return res.status(404).json({ message: "Pesanan tidak ditemukan" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat mengambil pesanan",
      error: error.message,
    });
  }
};

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { user_id, total_amount, status, order_items } = req.body;
    const newOrder = await Order.create({ user_id, total_amount, status });

    if (order_items && order_items.length > 0) {
      const orderItemsWithOrderId = order_items.map(item => ({
        ...item,
        order_id: newOrder.id
      }));
      await OrderItem.bulkCreate(orderItemsWithOrderId);
    }

    const createdOrder = await Order.findByPk(newOrder.id, { include: OrderItem });
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat membuat pesanan baru",
      error: error.message,
    });
  }
};

// Update an order
export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, total_amount, status, order_items } = req.body;
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: "Pesanan tidak ditemukan" });
    }
    await order.update({ user_id, total_amount, status });

    if (order_items && order_items.length > 0) {
      await OrderItem.destroy({ where: { order_id: id } });
      const orderItemsWithOrderId = order_items.map(item => ({
        ...item,
        order_id: id
      }));
      await OrderItem.bulkCreate(orderItemsWithOrderId);
    }

    const updatedOrder = await Order.findByPk(id, { include: OrderItem });
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat memperbarui pesanan",
      error: error.message,
    });
  }
};

// Delete an order
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: "Pesanan tidak ditemukan" });
    }
    await OrderItem.destroy({ where: { order_id: id } });
    await order.destroy();
    res.status(200).json({ message: "Pesanan berhasil dihapus" });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat menghapus pesanan",
      error: error.message,
    });
  }
};
