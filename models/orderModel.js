import { DataTypes } from 'sequelize';
import db from '../utils/connection.js';
import User from './usermodel.js';
import Payment from './paymentModel.js';
const Order = db.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  total_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled'),
    defaultValue: 'pending',
  },
  shipping_address: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  order_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: true,
});

// Associations
Order.belongsTo(User, { foreignKey: 'user_id' });
Order.hasMany(Order, { foreignKey: 'order_id' });

export default Order;
