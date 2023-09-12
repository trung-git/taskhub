const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');
const { createContract, getContracts, getContractById, deleteContract, updateContract, createContractByPost, officialContractByPost } = require('../controllers/contractController');
const router = express.Router();

router.use(protect);

router.post('/', createContract);
router.get('/', getContracts);
router.post('/:contractId/official/:postId', restrictTo('Tasker'), officialContractByPost);
router.post('/create-contract-by-post', createContractByPost);
router.get('/:contractId', getContractById);
router.delete('/:contractId', deleteContract);
router.patch('/:contractId', updateContract);

module.exports = router;
