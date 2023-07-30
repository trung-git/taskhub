const Chat = require('../models/chatModel');
const Contract = require('../models/contractModel');
const District = require('../models/districtModel');
const Tasker = require('../models/taskerModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createContract = catchAsync(async (req, res, next) => {
  const {
    taskerId,
    taskTagId,
    address,
    workLocationId,
    description,
    workTime,
  } = req.body;

  const tasker = await Tasker.findById(taskerId);
  if (!tasker) {
    return next(new AppError('Tasker not found', 400));
  }

  const taskTag = tasker.taskTag.find((v) => {
    return String(v.taskInfo._id) === taskTagId;
  });
  if (!taskTag) {
    return next(new AppError('Invalid Task Tag', 400));
  }

  const workLocation = await District.findById(workLocationId);
  if (!workLocation) {
    return next(new AppError('Work Location not found', 400));
  }

  const chat = await Chat.create({
    users: [{ user: req.user._id }, { user: tasker._id }],
  });

  const contract = await Contract.create({
    finder: req.user._id,
    tasker: tasker._id,
    chat: chat._id,
    address,
    workLocation: workLocation._id,
    taskTag: taskTag.taskInfo._id,
    price: taskTag.price,
    workTime,
    description,
  });

  return res.status(200).json({
    status: 'success',
    data: contract,
  });
});

exports.getContracts = catchAsync(async (req, res, next) => {
  const { _id, role } = req.user;

  const contracts = await Contract.find({
    [role.toLowerCase()]: _id,
  });

  return res.status(200).json({
    status: 'success',
    data: contracts,
  });
});

exports.getContractById = catchAsync(async (req, res, next) => {
  const { contractId } = req.params;
  const { _id, role } = req.user;

  const contract = await Contract.findOne({
    _id: contractId,
    [role.toLowerCase()]: _id,
  });

  if (!contract) {
    return next(new AppError('Contract not found', 400));
  }

  return res.status(200).json({
    status: 'success',
    data: contract,
  });
});

exports.deleteContract = catchAsync(async (req, res, next) => {
  const { contractId } = req.params;

  const contract = await Contract.deleteOne({
    _id: contractId,
    finder: req.user._id,
  });

  return res.status(200).json({
    status: 'success',
    data: contract,
  });
});

exports.activeContract = catchAsync(async (req, res, next) => {
  const { contractId } = req.params;

  const contract = await Contract.deleteOne({
    _id: contractId,
    finder: req.user._id,
  });

  if (!contract) {
    return next(new AppError('Contract not found', 400));
  }

  contract.isActive = true;
  const updatedContract = await contract.save();

  return res.status(200).json({
    status: 'success',
    data: updatedContract,
  });
});

exports.updateContract = catchAsync(async (req, res, next) => {
  const { contractId } = req.params;
  const { _id, role } = req.user;

  const contract = await Contract.findOne({
    _id: contractId,
    [role.toLowerCase()]: _id,
  });

  if (!contract) {
    return next(new AppError('Contract not found', 400));
  }

  contract.address = req.body.address || contract.address;
  contract.workLocation = req.body.workLocationId || contract.workLocation;
  contract.price = req.body.price || contract.price;
  contract.workTime = req.body.workTime || contract.workTime;
  contract.description = req.body.description || contract.description;
  contract.otherProps = req.body.otherProps || contract.otherProps;

  const updatedContract = await contract.save();

  return res.status(200).json({
    status: 'success',
    data: updatedContract,
  });
});
