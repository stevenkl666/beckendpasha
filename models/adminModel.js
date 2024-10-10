import { DataTypes } from 'sequelize';
import db from '../utils/connection.js';

const Admin = db.define('Admin', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'admin',
  },
  lastLogin: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  timestamps: true,
});

export default Admin;
