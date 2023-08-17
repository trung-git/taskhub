const router = require('express').Router();
const authController = require('../controllers/authController');
const walletController = require('../controllers/walletController');

router.use(authController.protect);
router.post('/', walletController.action);
router.get('/', walletController.getMyWallet);

module.exports = router;
