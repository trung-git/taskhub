const Chat = require('../models/chatModel');
const Contract = require('../models/contractModel');
const District = require('../models/districtModel');
const Post = require('../models/postModel');
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
    expireAt,
    paymentType,
    paymentPlan,
    price,
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
    price: price || taskTag.price,
    workTime,
    description,
    expireAt: expireAt,
    paymentType,
    paymentPlan,
  });

  const populatedContract = await Contract.populate(contract, {
    path: 'finder tasker taskTag workLocation',
  });

  return res.status(200).json({
    status: 'success',
    data: populatedContract,
  });
});

exports.createContractByPost = catchAsync(async (req, res, next) => {
  const { postId, candidateId, expireAt } = req.body;
  const post = await Post.findById(postId);

  if (!post) {
    return next(new AppError('Post not found', 400));
  }

  if (post.officialContract) {
    return next(new AppError('Post already have official contract', 400));
  }

  const candidate = post.candidate.find(v => {
    return String(v.user) === candidateId;
  })

  if (!candidate) {
    return next(new AppError('Invalid candidate', 400));
  }
  
  candidate.isSendInvitation = true;

  const chat = await Chat.create({
    users: [{ user: post.user._id }, { user: candidateId }],
  });

  const contract = await Contract.create({
    finder: post.user,
    tasker: candidateId,
    chat: chat._id,
    address: post.address,
    workLocation: post.workLocation,
    taskTag: post.taskTag,
    price: candidate.price,
    workTime: post.workTime,
    description: post.text,
    expireAt: expireAt,
    fromPost: post._id
  });

  const populatedContract = await Contract.populate(contract, {
    path: 'finder tasker taskTag workLocation',
  });

  return res.status(200).json({
    status: 'success',
    data: populatedContract,
  });
})

exports.getContracts = catchAsync(async (req, res, next) => {
  const pageNum = Number(req.query.pageNum) || 1;
  const recordsPerPage = Number(process.env.RECORDS_PER_PAGE);

  const { _id, role } = req.user;
  const { status } = req.query;

  const query = {
    [role.toLowerCase()]: _id,
  };
  const sortOption = {};
  if (status) {
    query.status = status;
    if (status === 'invitation') {
      sortOption.expireAt = -1;
    }
  }

  const contracts = await Contract.find(query).populate({
    path: 'finder tasker taskTag workLocation review fromPost',
  })
    .skip(recordsPerPage * (pageNum - 1))
    .limit(recordsPerPage)
    .sort(sortOption);

  const count = await Contract.countDocuments(query);

  return res.status(200).json({
    status: 'success',
    data: contracts,
    recordsPerPage,
    totalPage: Math.ceil(count / recordsPerPage),
    pageNum,
    totalRecords: count
  });
});

exports.getContractById = catchAsync(async (req, res, next) => {
  const { contractId } = req.params;
  const { _id, role } = req.user;
  const { status } = req.query;

  const query = {
    _id: contractId,
    [role.toLowerCase()]: _id,
  };

  if (status) {
    query.status = status;
  }

  const contract = await Contract.findOne(query).populate({
    path: 'finder tasker taskTag workLocation review fromPost',
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

  const contract = await Contract.findOneAndDelete({
    _id: contractId,
    finder: req.user._id,
  });

  await Chat.findOneAndDelete({
    _id: contract.chat,
  });
  // TODO delete unavailable time in tasker
  return res.status(200).json({
    status: 'success',
    data: contract,
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

  if (req.body.workLocationId) {
    const workLocation = await District.findById(req.body.workLocationId);
    if (!workLocation) {
      return next(new AppError('Work location not found'));
    }
    contract.workLocation = workLocation._id || contract.workLocation;
  }

  if (req.body.taskTagId) {
    const taskTag = contract.tasker.taskTag.find((v) => {
      return String(v.taskInfo._id) === req.body.taskTagId;
    });
    if (!taskTag) {
      return next(new AppError('Invalid Task Tag', 400));
    }
    contract.taskTag = taskTag._id || contract.taskTag;
  }

  contract.address = req.body.address || contract.address;
  contract.price = req.body.price || contract.price;
  contract.status = req.body.status || contract.status;
  contract.isPaid = req.body.isPaid || contract.isPaid;
  contract.startTime = req.body.startTime || contract.startTime;
  contract.endTime = req.body.endTime || contract.endTime;
  contract.workTime = req.body.workTime || contract.workTime;
  contract.expireAt = req.body.updateExpires
    ? req.body.expireAt
    : contract.expireAt;
  contract.description = req.body.description || contract.description;
  contract.otherProps = req.body.otherProps || contract.otherProps;
  contract.paymentType = req.body.paymentType || contract.paymentType;
  contract.paymentPlan = req.body.paymentPlan || contract.paymentPlan;
  contract.isRequireTaskProgress = req.body.isRequireTaskProgress || contract.isRequireTaskProgress;
  contract.taskProgress = req.body.taskProgress || contract.taskProgress;

  const updatedContract = await contract.save();

  const populatedContract = await Contract.populate(updatedContract, {
    path: 'finder tasker taskTag workLocation review',
  });
  
  return res.status(200).json({
    status: 'success',
    data: populatedContract,
  });
});
