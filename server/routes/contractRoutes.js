const express = require('express');
const { protect } = require('../controllers/authController');
const { createContract, getContracts, getContractById, deleteContract, activeContract, updateContract } = require('../controllers/contractController');
const router = express.Router();

router.use(protect);

router.post('/', createContract);
router.get('/', getContracts);
router.get('/:contractId', getContractById);
router.delete('/:contractId', deleteContract);
router.delete('/active/:contractId', activeContract);
router.patch('/:contractId', updateContract);

module.exports = router;