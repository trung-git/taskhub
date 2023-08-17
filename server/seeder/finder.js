const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const finders = [
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64a0163810f4179aa8f4c7b3'
    ),
    username: 'tien11',
    firstName: 'Tien',
    lastName: 'Nguyen',
    dateOfBirth: '1999-02-11',
    email: 'tien11@gmail.com',
    phoneNumber: '0123456789',
    gender: 'Male',
    image: '',
    password: bcrypt.hashSync('123456789', 10),
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12b2fde768d62c2605820'
    ),
    wallet:  mongoose.Types.ObjectId.createFromHexString(
      '64dd9416a4aaa12c3147b52a'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64a0253cb15f282da8c2f4e5'
    ),
    username: 'hai2',
    firstName: 'Hai',
    lastName: 'Pham',
    dateOfBirth: '1996-05-27',
    email: 'hai2@gmail.com',
    phoneNumber: '0123456789',
    gender: 'Male',
    image: '',
    password: bcrypt.hashSync('123456789', 10),
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12b2fde768d62c2605820'
    ),
    wallet:  mongoose.Types.ObjectId.createFromHexString(
      '64dd94311775c6aab1daee28'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64a025d4dd3ba65774131d6d'
    ),
    username: 'ngan222',
    firstName: 'Ngan',
    lastName: 'Huynh',
    dateOfBirth: '2000-11-12',
    email: 'ngan222@gmail.com',
    phoneNumber: '0123456789',
    gender: 'Female',
    image: '',
    password: bcrypt.hashSync('123456789', 10),
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12b2fde768d62c2605820'
    ),
    wallet:  mongoose.Types.ObjectId.createFromHexString(
      '64dd944e79de971cb85f97ed'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64a027923cdccf1afc84c413'
    ),
    username: 'mai120',
    firstName: 'Mai',
    lastName: 'Tran',
    dateOfBirth: '1990-05-11',
    email: 'mai120@gmail.com',
    phoneNumber: '0123456789',
    gender: 'Female',
    image: '',
    password: bcrypt.hashSync('123456789', 10),
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12b2fde768d62c2605820'
    ),
    wallet:  mongoose.Types.ObjectId.createFromHexString(
      '64dd9460dbd8f65dfcd52d95'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64a02850c21039353808b262'
    ),
    username: 'luong123',
    firstName: 'Luong',
    lastName: 'Le',
    dateOfBirth: '1990-05-11',
    email: 'luong123@gmail.com',
    phoneNumber: '0123456789',
    gender: 'Male',
    image: '',
    password: bcrypt.hashSync('123456789', 10),
    city: mongoose.Types.ObjectId.createFromHexString(
      '64a12b2fde768d62c2605820'
    ),
    wallet:  mongoose.Types.ObjectId.createFromHexString(
      '64dd9473a8c4192ffdde6824'
    ),
  },
];

module.exports = finders;
