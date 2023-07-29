const mongoose = require('mongoose');

const cities = [
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64a12b2fde768d62c2605820'
    ),
    name: 'Hồ Chí Minh',
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64c4964c74f1c90fe016a568'
    ),
    name: 'Đà Nẵng',
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64a12ae70e4a73f9a8f71a8e'
    ),
    name: 'Hà Nội',
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
  // Quận/HN
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64c493883145f1a9b0471b0e'
    ),
    name: 'Ba Đình',
    prefix: 'th_key_district_type1',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12ae70e4a73f9a8f71a8e'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64c49393a85f0c2c1d1cfa78'
    ),
    name: 'Hoàn Kiếm',
    prefix: 'th_key_district_type1',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12ae70e4a73f9a8f71a8e'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64c493aed0805b18b4b0029b'
    ),
    name: 'Tây Hồ',
    prefix: 'th_key_district_type1',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12ae70e4a73f9a8f71a8e'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64c493d644b04d59945a3f92'
    ),
    name: 'Long Biên',
    prefix: 'th_key_district_type1',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12ae70e4a73f9a8f71a8e'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64c493e1bca9c67473472721'
    ),
    name: 'Cầu Giấy',
    prefix: 'th_key_district_type1',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12ae70e4a73f9a8f71a8e'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64c493ff586cbc319596aac7'
    ),
    name: 'Đống Đa',
    prefix: 'th_key_district_type1',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12ae70e4a73f9a8f71a8e'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64c49422d73b6145af37176b'
    ),
    name: 'Hai Bà Trưng',
    prefix: 'th_key_district_type1',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12ae70e4a73f9a8f71a8e'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64c4942b5379b3073dd09aaf'
    ),
    name: 'Hoàng Mai',
    prefix: 'th_key_district_type1',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12ae70e4a73f9a8f71a8e'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64c494456356a0e1a9bb83f6'
    ),
    name: 'Thanh Xuân',
    prefix: 'th_key_district_type1',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12ae70e4a73f9a8f71a8e'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64c49450e1fdf04e0276382f'
    ),
    name: 'Hà Đông',
    prefix: 'th_key_district_type1',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12ae70e4a73f9a8f71a8e'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64c4948a842b017d73abd5e8'
    ),
    name: 'Bắc Từ Liêm',
    prefix: 'th_key_district_type1',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12ae70e4a73f9a8f71a8e'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64c494a8c920fc46dda36a79'
    ),
    name: 'Nam Từ Liêm',
    prefix: 'th_key_district_type1',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12ae70e4a73f9a8f71a8e'
    ),
  },
  // Thi xa / HN
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64c494dba1d7547244d025ee'
    ),
    name: 'Sơn Tây',
    prefix: 'th_key_district_type3',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12ae70e4a73f9a8f71a8e'
    ),
  },
  // Huyen / HN
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64c495014ab083fb04ea8db8'
    ),
    name: 'Ba Vì',
    prefix: 'th_key_district_type2',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12ae70e4a73f9a8f71a8e'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64c49516e1b9c79eb2a9e1a6'
    ),
    name: 'Chương Mỹ',
    prefix: 'th_key_district_type2',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12ae70e4a73f9a8f71a8e'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64c49528c11bf7019f02165d'
    ),
    name: 'Đan Phượng',
    prefix: 'th_key_district_type2',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12ae70e4a73f9a8f71a8e'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64c49540b033211afd41ba46'
    ),
    name: 'Đông Anh',
    prefix: 'th_key_district_type2',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12ae70e4a73f9a8f71a8e'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64c49564c7f6eec6c825ce7c'
    ),
    name: 'Gia Lâm',
    prefix: 'th_key_district_type2',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12ae70e4a73f9a8f71a8e'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64c4958638191d9dae8d0623'
    ),
    name: 'Hoài Đức',
    prefix: 'th_key_district_type2',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12ae70e4a73f9a8f71a8e'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64c4958f760b93f543dbc056'
    ),
    name: 'Mê Linh',
    prefix: 'th_key_district_type2',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12ae70e4a73f9a8f71a8e'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64c495a3ba566b4785aae731'
    ),
    name: 'Mỹ Đức',
    prefix: 'th_key_district_type2',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12ae70e4a73f9a8f71a8e'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64c495acabf94865e21df8f3'
    ),
    name: 'Phú Xuyên',
    prefix: 'th_key_district_type2',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12ae70e4a73f9a8f71a8e'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64c495c207592dba55b21fc3'
    ),
    name: 'Phúc Thọ',
    prefix: 'th_key_district_type2',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12ae70e4a73f9a8f71a8e'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64c495c96e5ace0c705c1cc9'
    ),
    name: 'Quốc Oai',
    prefix: 'th_key_district_type2',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12ae70e4a73f9a8f71a8e'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64c495dda94b86b0db9979d8'
    ),
    name: 'Sóc Sơn',
    prefix: 'th_key_district_type2',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12ae70e4a73f9a8f71a8e'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64c495f668e77e25b77be6e4'
    ),
    name: 'Thạch Thất',
    prefix: 'th_key_district_type2',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12ae70e4a73f9a8f71a8e'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64c495fdc37ffce742cf012a'
    ),
    name: 'Thanh Oai',
    prefix: 'th_key_district_type2',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12ae70e4a73f9a8f71a8e'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64c4961569a3798b41fb27c4'
    ),
    name: 'Thanh Trì',
    prefix: 'th_key_district_type2',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12ae70e4a73f9a8f71a8e'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64c49623cabcad23f2b1eea3'
    ),
    name: 'Thường Tín',
    prefix: 'th_key_district_type2',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12ae70e4a73f9a8f71a8e'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64c49635a66dace73206aba4'
    ),
    name: 'Ứng Hòa',
    prefix: 'th_key_district_type2',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12ae70e4a73f9a8f71a8e'
    ),
  },
  // Quận / DN
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64c4969cec22f6902d0a4842'
    ),
    name: 'Cẩm Lệ',
    prefix: 'th_key_district_type1',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64c4964c74f1c90fe016a568'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64c496ba6e3bff6d0afaa0d7'
    ),
    name: 'Hải Châu',
    prefix: 'th_key_district_type1',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64c4964c74f1c90fe016a568'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64c496c4eef6cbc6bcab6d2b'
    ),
    name: 'Liên Chiểu',
    prefix: 'th_key_district_type1',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64c4964c74f1c90fe016a568'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64c496d3ae6fd602024db9af'
    ),
    name: 'Ngũ Hành Sơn',
    prefix: 'th_key_district_type1',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64c4964c74f1c90fe016a568'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64c496e5ed1ea2d16f30b36b'
    ),
    name: 'Sơn Trà',
    prefix: 'th_key_district_type1',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64c4964c74f1c90fe016a568'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64c496fa9258ca85859a0301'
    ),
    name: 'Thanh Khê',
    prefix: 'th_key_district_type1',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64c4964c74f1c90fe016a568'
    ),
  },
  // Huyen / DN
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64c4970be1f12b5cb6a68ce8'
    ),
    name: 'Hòa Vang',
    prefix: 'th_key_district_type2',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64c4964c74f1c90fe016a568'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64c4972543195e6a58eebe80'
    ),
    name: 'Hoàng Sa',
    prefix: 'th_key_district_type2',
    city: mongoose.Types.ObjectId.createFromHexString(
      '64c4964c74f1c90fe016a568'
    ),
  },
];

module.exports = {
  cities,
  districts,
};
