const prisma = require("../config/utils");

const getAllPeserta = async (req, res) =>{
    try {
        const peserta =  await prisma.peserta.findMany({
             orderBy: {createdAt: "desc",},
        });
        return res.json(peserta);
    }catch (error) {
        console.error(error);
        return res.status(500).json({ message: "internal server eeror"});
    }
};

const getPesertaById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const peserta = await prisma.peserta.findUnique({
            where: {id},
        });
        if (!peserta)
            return res.status(404).json({ message : "peserta not found"});
        return res.json(peserta);
    } catch (error) {
          console.error(error);
        return res.status(500).json({ message: "internal server eeror"});
    }
}


const createPeserta = async (req, res) => {
    try {
    
        const {nama, telpn, kelas, jurusan} = req.body
        const peserta = await prisma.peserta.create({
           
            data: {nama, telpn, kelas, jurusan}
        });
        return res.status(201).json(peserta);
    } catch (error) {
      console.error(error);
    return res.status(400).json({ message: error.message });
    }
};

const updatePeserta = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
    const { nama, telpn,kelas, jurusan } = req.body;

    const category = await prisma.peserta.update({
      where: { id },
      data: { nama, telpn,kelas, jurusan },
    });
    return res.json(category);
    } catch (error) {
         console.error(error);
    if (error.code === "P2025") {
      // kode P2025 itu untuk tidak ketemu nilai nya
      return res.status(404).json({ message: "Peserta not found" });
    }
    return res.status(400).json({ message: error.message });
    }
}

const deletePeserta = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await prisma.peserta.delete({ where: { id } });
    return res.json({ message: "peserta deleted" });
  } catch (error) {
    console.error(error);
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Peserta not found" });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
    getAllPeserta,
    getPesertaById,
    createPeserta,
    updatePeserta,
    deletePeserta,
}
