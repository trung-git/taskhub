const City = require('../models/cityModel');
const District = require('../models/districtModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
// City Controllers
exports.getCities = catchAsync(async (req, res, next) => {
  const cities = await City.find();

  res.status(200).json({
    status: 'success',
    data: cities,
  });
});

exports.createCity = catchAsync(async (req, res, next) => {
  const city = {
    name: req.body.name,
    prefix: req.body.prefix,
  };
  const newCity = await City.create(city);

  res.status(200).json({
    status: 'success',
    data: newCity,
  });
});
// District Controllers
exports.getDistricts = catchAsync(async (req, res, next) => {
  const districts = await District.find();

  res.status(200).json({
    status: 'success',
    data: districts,
  });
});

// District Controllers
exports.getDistrictsByCity = catchAsync(async (req, res, next) => {
  const { cityId } = req.body;
  const city = await City.findById(cityId).populate({
    path: 'districts',
  });
  if (!city) {
    return next(new AppError('Invalid City', 400));
  }
  // TODO: Use Redis
  res.status(200).json({
    status: 'success',
    data: city.districts,
  });
});

exports.createDistrict = catchAsync(async (req, res, next) => {
  const city = await City.findById(req.body.city);
  if (!city) {
    return next(new AppError('Invalid City', 400));
  }
  const district = {
    name: req.body.name,
    prefix: req.body.prefix,
    city: city._id,
  };
  const newDistrict = await District.create(district);

  res.status(200).json({
    status: 'success',
    data: newDistrict,
  });
});
