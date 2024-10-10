import { DataTypes } from "sequelize";
import db from "../utils/connection.js";

const Produk = db.define(
  
  " Produk",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deskripsi:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    harga: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
  },
  {
    tableName: "produk",
  }
);

export default Produk;
