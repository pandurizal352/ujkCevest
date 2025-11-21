const express = require('express'); //import express
const Cors = require('cors'); // import  CORS package

const app = express();



// middleware global
app.use(Cors()); // enable  CORS untuk semua origin
// app.use(cors());  aktifkan cors (default: suemua origin di perbolehkan), 
// berguna saat frontend di origin berbeda
app.use(express.json()); //parse JSON body

// routes
const pesertaRoutes = require('./routes/PesertaRoutes');


// prefix api
app.use('/api/peserta', pesertaRoutes);




// healt-check
app.get('/', (req, res) => {
    res.send('API berjalan - gunakan /api/peserta');
})


// buat jalanin server package.json
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server berjalan pada port ${PORT}`);
})

