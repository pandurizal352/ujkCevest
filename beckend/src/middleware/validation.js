const validationBodyPeserta = (req, res, next) =>{
    let { nama, telpn,kelas, jurusan } = req.body;

    if (nama === undefined || telpn === undefined || kelas === undefined || jurusan === undefined){
        res.status(400).json({message: "tolong isi dengan lengkap"});
    }else{
        next();
    }
}



module.exports ={
    validationBodyPeserta,
   
}