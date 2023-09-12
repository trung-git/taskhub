const Wallet = require('../models/walletModel');
const Contract = require('../models/contractModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const ACTIONS = ['withdraw', 'deposit'];
exports.action = catchAsync(async (req, res, next) => {
  const { wallet: walletId, _id } = req.user;
  const { amount, action, contract: contractId } = req.body;

  const wallet = await Wallet.findById(walletId);
  if (!wallet) {
    return next(new AppError('Wallet not found', 400));
  }
  if (contractId) {
    const contract = await Contract.findById(contractId);
    if (!contract) {
      return next(new AppError('Contract not found', 400));
    }
    if (
      !(
        String(contract.finder) === String(_id) ||
        String(contract.tasker) === String(_id)
      )
    ) {
      return next(new AppError('Invalid Contract'));
    }
  }
  if (!ACTIONS.includes(action)) {
    return next(new AppError('Invalid action'));
  }

  const payment = {
    action,
    amount,
    contract: contractId,
  };
  if (action === 'deposit') {
    wallet.amount += amount;
  }
  if (action === 'withdraw') {
    if (Number(wallet.amount) - Number(amount) < 0) {
      return next(new AppError('Invalid amount', 400));
    }
    wallet.amount -= amount;
  }
  wallet.paymentHistory = [...wallet.paymentHistory, payment];

  const savedWallet = await wallet.save();

  res.status(200).json({
    status: 'success',
    data: savedWallet,
  });
});

exports.getMyWallet = catchAsync(async (req, res, next) => {
  const { wallet: id } = req.user;
  const wallet = await Wallet.findById(id);

  const contracts = await Contract.find({
    tasker: req.user._id,
    status: 'finish',
    isPaid: true
  });

  let byCast = 0;
  let byWallet = 0;

  [...contracts].forEach(v => {
    if (v.paymentType === "by-wallet") {
      if (v.paymentPlan === "one-time") {
        byWallet = byWallet + v.price;
      }
      else {
        byWallet = byWallet + v.price * ((v.workTime.to - v.workTime.from) / 1000 / 60 / 60);
      }
    } else {
      if (v.paymentPlan === "one-time") {
        byCast = byCast + v.price;
      }
      else {
        byCast = byCast + v.price * ((v.workTime.to - v.workTime.from) / 1000 / 60 / 60);
      }
    }
  });

  res.status(200).json({
    status: 'success',
    data: wallet,
    byCast,
    byWallet,
    total: byCast + byWallet
  });
});
