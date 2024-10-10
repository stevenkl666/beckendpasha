import { DataTypes } from 'sequelize';
import db from '../utils/connection.js';
import Order from './orderModel.js';
const Payment = db.define('Payment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Order,
      key: 'id',
    },
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  payment_method: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'failed'),
    defaultValue: 'pending',
  },
  transaction_id: {
    type: DataTypes.STRING,
    unique: true,
  },
  payment_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: true,
});

// Association
Payment.belongsTo(Order, { foreignKey: 'order_id' });
Order.hasOne(Payment, { foreignKey: 'order_id' });

export default Payment;
