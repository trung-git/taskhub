const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const taskers = [
  {
    username: 'trunghuynh',
    firstName: 'Trung',
    lastName: 'Huynh',
    dateOfBirth: '1993-02-11',
    email: 'trunght1810@gmail.com',
    phoneNumber: '0123456789',
    gender: 'Male',
    image: '',
    password: bcrypt.hashSync('123456789', 10),
    workLocation: [
      mongoose.Types.ObjectId.createFromHexString('64a129fd40878eb40868ebd0'),
    ],
    taskTag: [
      {
        taskInfo: mongoose.Types.ObjectId.createFromHexString(
          '64a0163810f4179aa8f4c7b3'
        ),
        price: 7,
      },
    ],
    workTime: [
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
    ],
    reviews: [
      mongoose.Types.ObjectId.createFromHexString('64a029cd505314a289b1c18d'),
    ],
    profile: {
      aboutMe:
        'Ex tempor exercitation aliqua eiusmod. Sint exercitation exercitation Lorem velit labore proident Lorem quis fugiat. Velit Lorem consequat laboris adipisicing ex ut aliqua ut et et qui. Sint cillum cupidatat non proident do in esse amet ex ullamco id cillum deserunt. Esse velit irure sint veniam mollit aute aliqua eu aliquip Lorem ad. Consectetur velit consectetur fugiat amet pariatur eiusmod.',
      skillAndExperience:
        'Magna dolor officia consequat cupidatat nostrud. In proident ex irure reprehenderit do adipisicing sunt ullamco mollit proident dolor voluptate elit. Eu adipisicing elit enim elit nulla laborum. Mollit fugiat consectetur cillum elit nisi cupidatat occaecat. Ea deserunt exercitation laborum enim aute et aliqua aliqua adipisicing incididunt est laboris. Incididunt est et proident excepteur reprehenderit eiusmod proident laboris consequat anim sint mollit consectetur. Ipsum tempor id aliquip magna ad non pariatur qui Lorem quis cupidatat consequat enim.',
      photo: [],
      vehicle: 'Bike',
    },
    averageRating: 5,
    contracts: [],
    isVerified: true,
  },
  {
    username: 'bao1',
    firstName: 'Bao',
    lastName: 'Nguyen',
    dateOfBirth: '1993-02-11',
    email: 'bao1@gmail.com',
    phoneNumber: '0123456789',
    gender: 'Male',
    image: '',
    password: bcrypt.hashSync('123456789', 10),
    workLocation: [
      mongoose.Types.ObjectId.createFromHexString('64a129fd40878eb40868ebd0'),
    ],
    taskTag: [
      {
        taskInfo: mongoose.Types.ObjectId.createFromHexString(
          '64a0163810f4179aa8f4c7b3'
        ),
        price: 7,
      },
    ],
    workTime: [
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
    ],
    reviews: [
      mongoose.Types.ObjectId.createFromHexString('64a029cd505314a289b1c18d'),
    ],
    profile: {
      aboutMe:
        'Ex tempor exercitation aliqua eiusmod. Sint exercitation exercitation Lorem velit labore proident Lorem quis fugiat. Velit Lorem consequat laboris adipisicing ex ut aliqua ut et et qui. Sint cillum cupidatat non proident do in esse amet ex ullamco id cillum deserunt. Esse velit irure sint veniam mollit aute aliqua eu aliquip Lorem ad. Consectetur velit consectetur fugiat amet pariatur eiusmod.',
      skillAndExperience:
        'Magna dolor officia consequat cupidatat nostrud. In proident ex irure reprehenderit do adipisicing sunt ullamco mollit proident dolor voluptate elit. Eu adipisicing elit enim elit nulla laborum. Mollit fugiat consectetur cillum elit nisi cupidatat occaecat. Ea deserunt exercitation laborum enim aute et aliqua aliqua adipisicing incididunt est laboris. Incididunt est et proident excepteur reprehenderit eiusmod proident laboris consequat anim sint mollit consectetur. Ipsum tempor id aliquip magna ad non pariatur qui Lorem quis cupidatat consequat enim.',
      photo: [],
      vehicle: 'Bike',
    },
    averageRating: 5,
    contracts: [],
    isVerified: true,
  },
  {
    username: 'ly1',
    firstName: 'Ly',
    lastName: 'Nguyen',
    dateOfBirth: '1993-02-11',
    email: 'ly1@gmail.com',
    phoneNumber: '0123456789',
    gender: 'Female',
    image: '',
    password: bcrypt.hashSync('123456789', 10),
    workLocation: [
      mongoose.Types.ObjectId.createFromHexString('64a129fd40878eb40868ebd0'),
    ],
    taskTag: [
      {
        taskInfo: mongoose.Types.ObjectId.createFromHexString(
          '64a0163810f4179aa8f4c7b3'
        ),
        price: 9,
      },
    ],
    workTime: [
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
    ],
    reviews: [
      mongoose.Types.ObjectId.createFromHexString('64a029cd505314a289b1c18d'),
    ],
    profile: {
      aboutMe:
        'Ex tempor exercitation aliqua eiusmod. Sint exercitation exercitation Lorem velit labore proident Lorem quis fugiat. Velit Lorem consequat laboris adipisicing ex ut aliqua ut et et qui. Sint cillum cupidatat non proident do in esse amet ex ullamco id cillum deserunt. Esse velit irure sint veniam mollit aute aliqua eu aliquip Lorem ad. Consectetur velit consectetur fugiat amet pariatur eiusmod.',
      skillAndExperience:
        'Magna dolor officia consequat cupidatat nostrud. In proident ex irure reprehenderit do adipisicing sunt ullamco mollit proident dolor voluptate elit. Eu adipisicing elit enim elit nulla laborum. Mollit fugiat consectetur cillum elit nisi cupidatat occaecat. Ea deserunt exercitation laborum enim aute et aliqua aliqua adipisicing incididunt est laboris. Incididunt est et proident excepteur reprehenderit eiusmod proident laboris consequat anim sint mollit consectetur. Ipsum tempor id aliquip magna ad non pariatur qui Lorem quis cupidatat consequat enim.',
      photo: [],
      vehicle: 'Bike',
    },
    averageRating: 4,
    contracts: [],
    isVerified: true,
  },
  {
    username: 'hai122',
    firstName: 'Hai',
    lastName: 'Nguyen',
    dateOfBirth: '1993-02-11',
    email: 'hai122@gmail.com',
    phoneNumber: '0123456789',
    gender: 'Female',
    image: '',
    password: bcrypt.hashSync('123456789', 10),
    workLocation: [
      mongoose.Types.ObjectId.createFromHexString('64a129fd40878eb40868ebd0'),
    ],
    taskTag: [
      {
        taskInfo: mongoose.Types.ObjectId.createFromHexString(
          '64a0163810f4179aa8f4c7b3'
        ),
        price: 11,
      },
    ],
    workTime: [
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
    ],
    reviews: [
      mongoose.Types.ObjectId.createFromHexString('64a029cd505314a289b1c18d'),
    ],
    profile: {
      aboutMe:
        'Ex tempor exercitation aliqua eiusmod. Sint exercitation exercitation Lorem velit labore proident Lorem quis fugiat. Velit Lorem consequat laboris adipisicing ex ut aliqua ut et et qui. Sint cillum cupidatat non proident do in esse amet ex ullamco id cillum deserunt. Esse velit irure sint veniam mollit aute aliqua eu aliquip Lorem ad. Consectetur velit consectetur fugiat amet pariatur eiusmod.',
      skillAndExperience:
        'Magna dolor officia consequat cupidatat nostrud. In proident ex irure reprehenderit do adipisicing sunt ullamco mollit proident dolor voluptate elit. Eu adipisicing elit enim elit nulla laborum. Mollit fugiat consectetur cillum elit nisi cupidatat occaecat. Ea deserunt exercitation laborum enim aute et aliqua aliqua adipisicing incididunt est laboris. Incididunt est et proident excepteur reprehenderit eiusmod proident laboris consequat anim sint mollit consectetur. Ipsum tempor id aliquip magna ad non pariatur qui Lorem quis cupidatat consequat enim.',
      photo: [],
      vehicle: 'Bike',
    },
    averageRating: 4.4,
    contracts: [],
    isVerified: true,
  },
  {
    username: 'kien111',
    firstName: 'Kien',
    lastName: 'Nguyen',
    dateOfBirth: '1993-02-11',
    email: 'kien111@gmail.com',
    phoneNumber: '0123456789',
    gender: 'Male',
    image: '',
    password: bcrypt.hashSync('123456789', 10),
    workLocation: [
      mongoose.Types.ObjectId.createFromHexString('64a12a02c4fd3a5525681e29'),
    ],
    taskTag: [
      {
        taskInfo: mongoose.Types.ObjectId.createFromHexString(
          '64a0163810f4179aa8f4c7b3'
        ),
        price: 15,
      },
    ],
    workTime: [
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
    ],
    reviews: [
      mongoose.Types.ObjectId.createFromHexString('64a029cd505314a289b1c18d'),
    ],
    profile: {
      aboutMe:
        'Ex tempor exercitation aliqua eiusmod. Sint exercitation exercitation Lorem velit labore proident Lorem quis fugiat. Velit Lorem consequat laboris adipisicing ex ut aliqua ut et et qui. Sint cillum cupidatat non proident do in esse amet ex ullamco id cillum deserunt. Esse velit irure sint veniam mollit aute aliqua eu aliquip Lorem ad. Consectetur velit consectetur fugiat amet pariatur eiusmod.',
      skillAndExperience:
        'Magna dolor officia consequat cupidatat nostrud. In proident ex irure reprehenderit do adipisicing sunt ullamco mollit proident dolor voluptate elit. Eu adipisicing elit enim elit nulla laborum. Mollit fugiat consectetur cillum elit nisi cupidatat occaecat. Ea deserunt exercitation laborum enim aute et aliqua aliqua adipisicing incididunt est laboris. Incididunt est et proident excepteur reprehenderit eiusmod proident laboris consequat anim sint mollit consectetur. Ipsum tempor id aliquip magna ad non pariatur qui Lorem quis cupidatat consequat enim.',
      photo: [],
      vehicle: 'Bike',
    },
    averageRating: 3,
    contracts: [],
    isVerified: true,
  },
  {
    username: 'mai1123',
    firstName: 'Mai',
    lastName: 'Nguyen',
    dateOfBirth: '1993-02-11',
    email: 'mai1123@gmail.com',
    phoneNumber: '0123456789',
    gender: 'Male',
    image: '',
    password: bcrypt.hashSync('123456789', 10),
    workLocation: [
      mongoose.Types.ObjectId.createFromHexString('64a12a02c4fd3a5525681e29'),
    ],
    taskTag: [
      {
        taskInfo: mongoose.Types.ObjectId.createFromHexString(
          '64a0163810f4179aa8f4c7b3'
        ),
        price: 5,
      },
    ],
    workTime: [
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
    ],
    reviews: [
      mongoose.Types.ObjectId.createFromHexString('64a029cd505314a289b1c18d'),
    ],
    profile: {
      aboutMe:
        'Ex tempor exercitation aliqua eiusmod. Sint exercitation exercitation Lorem velit labore proident Lorem quis fugiat. Velit Lorem consequat laboris adipisicing ex ut aliqua ut et et qui. Sint cillum cupidatat non proident do in esse amet ex ullamco id cillum deserunt. Esse velit irure sint veniam mollit aute aliqua eu aliquip Lorem ad. Consectetur velit consectetur fugiat amet pariatur eiusmod.',
      skillAndExperience:
        'Magna dolor officia consequat cupidatat nostrud. In proident ex irure reprehenderit do adipisicing sunt ullamco mollit proident dolor voluptate elit. Eu adipisicing elit enim elit nulla laborum. Mollit fugiat consectetur cillum elit nisi cupidatat occaecat. Ea deserunt exercitation laborum enim aute et aliqua aliqua adipisicing incididunt est laboris. Incididunt est et proident excepteur reprehenderit eiusmod proident laboris consequat anim sint mollit consectetur. Ipsum tempor id aliquip magna ad non pariatur qui Lorem quis cupidatat consequat enim.',
      photo: [],
      vehicle: 'Bike',
    },
    averageRating: 3.8,
    contracts: [],
    isVerified: true,
  },
  {
    username: 'tin1212',
    firstName: 'Tin',
    lastName: 'Nguyen',
    dateOfBirth: '1991-02-11',
    email: 'tin1212@gmail.com',
    phoneNumber: '0123456789',
    gender: 'Female',
    image: '',
    password: bcrypt.hashSync('123456789', 10),
    workLocation: [
      mongoose.Types.ObjectId.createFromHexString('64a12a02c4fd3a5525681e29'),
    ],
    taskTag: [
      {
        taskInfo: mongoose.Types.ObjectId.createFromHexString(
          '64a01990544c07c755c71904'
        ),
        price: 11,
      },
      {
        taskInfo: mongoose.Types.ObjectId.createFromHexString(
          '64a0163810f4179aa8f4c7b3'
        ),
        price: 20,
      },
    ],
    workTime: [
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
    ],
    reviews: [
      mongoose.Types.ObjectId.createFromHexString('64a029d2f3638096a8cf4de7'),
    ],
    profile: {
      aboutMe:
        'Ex tempor exercitation aliqua eiusmod. Sint exercitation exercitation Lorem velit labore proident Lorem quis fugiat. Velit Lorem consequat laboris adipisicing ex ut aliqua ut et et qui. Sint cillum cupidatat non proident do in esse amet ex ullamco id cillum deserunt. Esse velit irure sint veniam mollit aute aliqua eu aliquip Lorem ad. Consectetur velit consectetur fugiat amet pariatur eiusmod.',
      skillAndExperience:
        'Magna dolor officia consequat cupidatat nostrud. In proident ex irure reprehenderit do adipisicing sunt ullamco mollit proident dolor voluptate elit. Eu adipisicing elit enim elit nulla laborum. Mollit fugiat consectetur cillum elit nisi cupidatat occaecat. Ea deserunt exercitation laborum enim aute et aliqua aliqua adipisicing incididunt est laboris. Incididunt est et proident excepteur reprehenderit eiusmod proident laboris consequat anim sint mollit consectetur. Ipsum tempor id aliquip magna ad non pariatur qui Lorem quis cupidatat consequat enim.',
      photo: [],
      vehicle: 'Bike',
    },
    averageRating: 3.5,
    contracts: [],
  },
  {
    username: 'kien121',
    firstName: 'Kien',
    lastName: 'Nguyen',
    dateOfBirth: '1991-02-11',
    email: 'kien121@gmail.com',
    phoneNumber: '0123456789',
    gender: 'Male',
    image: '',
    password: bcrypt.hashSync('123456789', 10),
    workLocation: [
      mongoose.Types.ObjectId.createFromHexString('64a129fd40878eb40868ebd0'),
    ],
    taskTag: [
      {
        taskInfo: mongoose.Types.ObjectId.createFromHexString(
          '64a01c237aa7438ccab0850b'
        ),
        price: 77,
      },
    ],
    workTime: [
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
    ],
    reviews: [
      mongoose.Types.ObjectId.createFromHexString('64a02b8ba2ea157ee7bcca69'),
    ],
    profile: {
      aboutMe:
        'Ex tempor exercitation aliqua eiusmod. Sint exercitation exercitation Lorem velit labore proident Lorem quis fugiat. Velit Lorem consequat laboris adipisicing ex ut aliqua ut et et qui. Sint cillum cupidatat non proident do in esse amet ex ullamco id cillum deserunt. Esse velit irure sint veniam mollit aute aliqua eu aliquip Lorem ad. Consectetur velit consectetur fugiat amet pariatur eiusmod.',
      skillAndExperience:
        'Magna dolor officia consequat cupidatat nostrud. In proident ex irure reprehenderit do adipisicing sunt ullamco mollit proident dolor voluptate elit. Eu adipisicing elit enim elit nulla laborum. Mollit fugiat consectetur cillum elit nisi cupidatat occaecat. Ea deserunt exercitation laborum enim aute et aliqua aliqua adipisicing incididunt est laboris. Incididunt est et proident excepteur reprehenderit eiusmod proident laboris consequat anim sint mollit consectetur. Ipsum tempor id aliquip magna ad non pariatur qui Lorem quis cupidatat consequat enim.',
      photo: [],
      vehicle: 'Bike',
    },
    contracts: [],
    averageRating: 3.8,
    isVerified: true,
  },
  {
    username: 'ly11',
    firstName: 'Ly',
    lastName: 'Nguyen',
    dateOfBirth: '1991-02-11',
    email: 'ly11@gmail.com',
    phoneNumber: '0123456789',
    gender: 'Male',
    image: '',
    password: bcrypt.hashSync('123456789', 10),
    workLocation: [
      mongoose.Types.ObjectId.createFromHexString('64a129fd40878eb40868ebd0'),
    ],
    taskTag: [
      {
        taskInfo: mongoose.Types.ObjectId.createFromHexString(
          '64a0163810f4179aa8f4c7b3'
        ),
        price: 55,
      },
    ],
    workTime: [
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
    ],
    reviews: [
      mongoose.Types.ObjectId.createFromHexString('64a02beae0dd076a732bc0f2'),
    ],
    profile: {
      aboutMe:
        'Ex tempor exercitation aliqua eiusmod. Sint exercitation exercitation Lorem velit labore proident Lorem quis fugiat. Velit Lorem consequat laboris adipisicing ex ut aliqua ut et et qui. Sint cillum cupidatat non proident do in esse amet ex ullamco id cillum deserunt. Esse velit irure sint veniam mollit aute aliqua eu aliquip Lorem ad. Consectetur velit consectetur fugiat amet pariatur eiusmod.',
      skillAndExperience:
        'Magna dolor officia consequat cupidatat nostrud. In proident ex irure reprehenderit do adipisicing sunt ullamco mollit proident dolor voluptate elit. Eu adipisicing elit enim elit nulla laborum. Mollit fugiat consectetur cillum elit nisi cupidatat occaecat. Ea deserunt exercitation laborum enim aute et aliqua aliqua adipisicing incididunt est laboris. Incididunt est et proident excepteur reprehenderit eiusmod proident laboris consequat anim sint mollit consectetur. Ipsum tempor id aliquip magna ad non pariatur qui Lorem quis cupidatat consequat enim.',
      photo: [],
      vehicle: 'Bike',
    },
    contracts: [],
    averageRating: 4.5,
    isVerified: true,
  },
  {
    username: 'hien11',
    firstName: 'Hien',
    lastName: 'Nguyen',
    dateOfBirth: '1991-02-11',
    email: 'hien11@gmail.com',
    phoneNumber: '0123456789',
    gender: 'Male',
    image: '',
    password: bcrypt.hashSync('123456789', 10),
    workLocation: [
      mongoose.Types.ObjectId.createFromHexString('64a129fd40878eb40868ebd0'),
    ],
    taskTag: [
      {
        taskInfo: mongoose.Types.ObjectId.createFromHexString(
          '64a0163810f4179aa8f4c7b3'
        ),
        price: 33,
      },
    ],
    workTime: [
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
      {
        date: '',
        start: '08:00',
        end: '17:00',
      },
    ],
    reviews: [
      mongoose.Types.ObjectId.createFromHexString('64a02c4f152570b13b56613a'),
    ],
    profile: {
      aboutMe:
        'Ex tempor exercitation aliqua eiusmod. Sint exercitation exercitation Lorem velit labore proident Lorem quis fugiat. Velit Lorem consequat laboris adipisicing ex ut aliqua ut et et qui. Sint cillum cupidatat non proident do in esse amet ex ullamco id cillum deserunt. Esse velit irure sint veniam mollit aute aliqua eu aliquip Lorem ad. Consectetur velit consectetur fugiat amet pariatur eiusmod.',
      skillAndExperience:
        'Magna dolor officia consequat cupidatat nostrud. In proident ex irure reprehenderit do adipisicing sunt ullamco mollit proident dolor voluptate elit. Eu adipisicing elit enim elit nulla laborum. Mollit fugiat consectetur cillum elit nisi cupidatat occaecat. Ea deserunt exercitation laborum enim aute et aliqua aliqua adipisicing incididunt est laboris. Incididunt est et proident excepteur reprehenderit eiusmod proident laboris consequat anim sint mollit consectetur. Ipsum tempor id aliquip magna ad non pariatur qui Lorem quis cupidatat consequat enim.',
      photo: [],
      vehicle: 'Bike',
    },
    contracts: [],
    averageRating: 3.5,
  },
];

module.exports = taskers;
