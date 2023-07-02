const mongoose = require('mongoose');

const cities = [
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64a12b2fde768d62c2605820'
    ),
    name: 'Ho chi Minh',
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64a12ae70e4a73f9a8f71a8e'
    ),
    name: 'Ha Noi',
    prefix: 'th_key_capital',
  },
];
const districts = [
  // Quận / HCM
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64a129fd40878eb40868ebd0'
    ),
    name: '1',
    prefix: 'th_key_district_type1',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12b2fde768d62c2605820'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64a12a02c4fd3a5525681e29'
    ),
    name: '2',
    prefix: 'th_key_district_type1',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12b2fde768d62c2605820'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64a12a06b021b1b0e10383e6'
    ),
    name: '3',
    prefix: 'th_key_district_type1',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12b2fde768d62c2605820'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64a12a0d6097fe91050cb692'
    ),
    name: '4',
    prefix: 'th_key_district_type1',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12b2fde768d62c2605820'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64a12a12e8802ab398682351'
    ),
    name: '5',
    prefix: 'th_key_district_type1',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12b2fde768d62c2605820'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64a12a193adf4ada20af6750'
    ),
    name: '6',
    prefix: 'th_key_district_type1',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12b2fde768d62c2605820'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64a12a1f1ce88e78399cd1c2'
    ),
    name: '7',
    prefix: 'th_key_district_type1',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12b2fde768d62c2605820'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64a12a24b276278c79a45bf1'
    ),
    name: '8',
    prefix: 'th_key_district_type1',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12b2fde768d62c2605820'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64a12a280ddf7b31c36c4382'
    ),
    name: '9',
    prefix: 'th_key_district_type1',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12b2fde768d62c2605820'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64a12a2e16618a4048fdf22a'
    ),
    name: '10',
    prefix: 'th_key_district_type1',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12b2fde768d62c2605820'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64a12a330f62889dd832e031'
    ),
    name: '11',
    prefix: 'th_key_district_type1',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12b2fde768d62c2605820'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64a12a3753efbf2684f54060'
    ),
    name: '12',
    prefix: 'th_key_district_type1',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12b2fde768d62c2605820'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64a12b98b51501647434c925'
    ),
    name: 'Bình Thạnh',
    prefix: 'th_key_district_type1',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12b2fde768d62c2605820'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64a12bbd90b3b6452c02b9b3'
    ),
    name: 'Bình Tân',
    prefix: 'th_key_district_type1',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12b2fde768d62c2605820'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64a12bd946f4c9e36b0fcbb6'
    ),
    name: 'Gò Vấp',
    prefix: 'th_key_district_type1',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12b2fde768d62c2605820'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64a12beab2792129670c28ff'
    ),
    name: 'Phú Nhuận',
    prefix: 'th_key_district_type1',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12b2fde768d62c2605820'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64a12bff46702d413189589a'
    ),
    name: 'Tân Bình',
    prefix: 'th_key_district_type1',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12b2fde768d62c2605820'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64a12c237aaf85022b7e5d1c'
    ),
    name: 'Tân Phú',
    prefix: 'th_key_district_type1',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12b2fde768d62c2605820'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64a12ce65e66eea9f4f22dfd'
    ),
    name: 'Thủ Đức',
    prefix: 'th_key_district_type1',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12b2fde768d62c2605820'
    ),
  },
  // Huyện / HCM
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64a12d15d91c083cf03a4848'
    ),
    name: 'Hóc Môn',
    prefix: 'th_key_district_type2',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12b2fde768d62c2605820'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64a12d2ec4aa4b40b2099dd4'
    ),
    name: 'Củ Chi',
    prefix: 'th_key_district_type2',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12b2fde768d62c2605820'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64a12d50d5a185a4cf760dcf'
    ),
    name: 'Nhà Bè',
    prefix: 'th_key_district_type2',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12b2fde768d62c2605820'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64a12d6cd890d74f51eba3f3'
    ),
    name: 'Bình Chánh',
    prefix: 'th_key_district_type2',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12b2fde768d62c2605820'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64a12d6f2fa4bc91ff298caf'
    ),
    name: 'Cần Giờ',
    prefix: 'th_key_district_type2',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12b2fde768d62c2605820'
    ),
  },
];

module.exports = {
  cities,
  districts,
};
