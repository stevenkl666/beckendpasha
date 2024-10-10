import User from '../models/usermodel.js';
import Admin from '../models/adminModel.js';
import Produk from '../models/produkModel.js';
import Order from '../models/orderModel.js';
import OrderItem from '../models/orderItemModel.js';
import Payment from '../models/paymentModel.js';


export default async function clean (){
    await User.destroy({
        where: {},
        force: true,
        cascade: true,
    });
    await Item.destroy({
        where: {},
        force: true,
        cascade: true,
    })
    await Admin.destroy({
        where: {},
        force: true,
        cascade: true,
    })
    
}

clean()