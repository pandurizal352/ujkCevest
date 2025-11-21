// src/routes/PesertaRoutes.js
const express = require ('express');
const router = express.Router();
const PesertaController = require('../controllers/pesertaController');
const { validationBodyPeserta } = require('../middleware/validation');

router.get('/', PesertaController.getAllPeserta);
router.get('/:id', PesertaController.getPesertaById);
router.post('/', validationBodyPeserta, PesertaController.createPeserta);
router.put('/:id', validationBodyPeserta, PesertaController.updatePeserta);
router.delete('/:id', PesertaController.deletePeserta);

module.exports = router;