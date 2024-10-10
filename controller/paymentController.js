import Payment from "../models/paymentModel.js";
import Order from "../models/orderModel.js";

export const getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.findAll({
            include: [Order]
        });
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching payments", error: error.message });
    }
};

export const getPaymentById = async (req, res) => {
    try {
        const { id } = req.params;
        const payment = await Payment.findByPk(id, {
            include: [Order]
        });
        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }
        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ message: "Error fetching payment", error: error.message });
    }
};

export const createPayment = async (req, res) => {
    try {
        const { order_id, amount, payment_method, transaction_id } = req.body;
        const newPayment = await Payment.create({
            order_id,
            amount,
            payment_method,
            transaction_id,
            status: 'pending'
        });
        res.status(201).json(newPayment);
    } catch (error) {
        res.status(500).json({ message: "Error creating payment", error: error.message });
    }
};

export const updatePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const payment = await Payment.findByPk(id);
        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }
        const updatedPayment = await payment.update({ status });
        res.status(200).json(updatedPayment);
    } catch (error) {
        res.status(500).json({ message: "Error updating payment", error: error.message });
    }
};

export const deletePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Payment.destroy({ where: { id } });
        if (deleted) {
            res.status(200).json({ message: "Payment deleted successfully" });
        } else {
            res.status(404).json({ message: "Payment not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting payment", error: error.message });
    }
};
