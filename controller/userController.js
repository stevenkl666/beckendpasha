import User from "../models/usermodel";

export const getAllUser = async (req, res) => {
    try{
        const User = await User.findAll();
        res.status(200).json(User)   
    } catch(error){
        res.status(500).json({error: error.massage, message: "terjadi kesalahan saat getAllUser"})
    }
};   

export const getUserById = async (req, res) => {
    try {
        const {id} = req.params; // Mengambil ID dari parameter URL
        const User = await User.findByPk(id); // Menggunakan findByPk untuk mencari berdasarkan primary key
        if (!User) {
            return res.status(404).json({ message: "user tidak ditemukan" });
        }
        res.status(200).json(User);
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan saat mengambil id", error: error.message });
    }
};


export const createUser = async (req, res) => {
    const { name } = req.body;
    const User = await User.create({ name });
  
    res.status(201).json(User);
};


export const updateUser = async (req, res) => {
    try{
        const { id } = req.params;
        const { name, type, description } = req.body;
        const updated = await User.update({ name, type, description }, { where: { id } });
        const updateUser = await User.findByPk(id);
        // JIKA TIDAK ADA YANG TERUPDATE MAKA AKAN ERROR
        if (updated === 0){
            res.status(404).json({ message: "user tidak ter-update"})
        }else{
            res.status(200).json(updateUser);
        }
    }catch(error){
        res.status(500).json({error: error.message, message: "gagal mengupdate user"})
    }
}

export const deleteUser = async (req, res) => {
    try{
        const { id } = req.params;
        const deleted = await User.destroy({where: {id}});
        res.status(200).json(deleted + ` user ke ${id} berhasil diusir`)
    }catch(error){
        res.status(500).json({error: error.message, message: "gagal menghapus user"})
    }
}