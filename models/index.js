import db from "../utils/connection.js";
import Admin from "./adminModel.js";
import User from "./usermodel.js";
import Produk from "./produkModel.js";
import Payment from "./paymentModel.js";
import Order from "./orderModel.js";
import OrderItem from "./orderItemModel.js";

await Admin.sync();
await User.sync();
await Produk.sync();
await Payment.sync();
await Order.sync();
await OrderItem.sync();

await db.sync({ alter: true });