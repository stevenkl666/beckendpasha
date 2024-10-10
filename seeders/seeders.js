import Admin from "../models/adminModel.js";
import User from "../models/usermodel.js";
import Order from "../models/orderModel.js";
import Payment from "../models/paymentModel.js";
import OrderItem from "../models/orderItemModel.js";
import Produk from "../models/produkModel.js";

const createSeeder = async () => {
  const admin = await Admin.create({
    email: "Admin123",
    password: "admin123",
    nama: "Admin1",
  });
  const user = await User.create({
    name: "Jao Felix",
    email: "JaoFelix@hotmail.com",
    password: "JaoFelixBego",
  });
  const Produk1 = await Item.create({
    name: "jodivape",
    rasa_liquid: "chocolate",
    harga: 15000,
    UserId: user.dataValues.id,
    AdminId: admin.dataValues.id,
  });
  const Produk2 = await Item.create({
    name: "terminator",
    rasa_liquid: "strawberry",
    harga: 15000,
    UserId: user.dataValues.id,
    AdminId: admin.dataValues.id,
  });

  const findItemByUser = await Produk.findAll({
    where: {
      UserId: user.dataValues.id,
    },
  });

  const deleteUser = async (id) => {
    await User.destroy({
      where: {
        id,
      },
    });
  };

  return findProdukByUser;
};
createSeeder();
