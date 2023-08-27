const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const taskers = [
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64b253f56dc6525e4693f475'
    ),
    username: 'trunghuynh',
    firstName: 'Trung',
    lastName: 'Huynh',
    dateOfBirth: '1993-02-11',
    email: 'trunght1810@gmail.com',
    phoneNumber: '0123456789',
    gender: 'Male',
    image: 'https://res.cloudinary.com/dxohnl1zt/image/upload/v1690676260/userAvatar/rkc7g9uh9ffnftyssjj2.jpg',
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
    reviews: [
      mongoose.Types.ObjectId.createFromHexString('64a029cd505314a289b1c18d'),
    ],
    aboutMe:
      'Ex tempor exercitation aliqua eiusmod. Sint exercitation exercitation Lorem velit labore proident Lorem quis fugiat. Velit Lorem consequat laboris adipisicing ex ut aliqua ut et et qui. Sint cillum cupidatat non proident do in esse amet ex ullamco id cillum deserunt. Esse velit irure sint veniam mollit aute aliqua eu aliquip Lorem ad. Consectetur velit consectetur fugiat amet pariatur eiusmod.',
    skillAndExperience:
      'Magna dolor officia consequat cupidatat nostrud. In proident ex irure reprehenderit do adipisicing sunt ullamco mollit proident dolor voluptate elit. Eu adipisicing elit enim elit nulla laborum. Mollit fugiat consectetur cillum elit nisi cupidatat occaecat. Ea deserunt exercitation laborum enim aute et aliqua aliqua adipisicing incididunt est laboris. Incididunt est et proident excepteur reprehenderit eiusmod proident laboris consequat anim sint mollit consectetur. Ipsum tempor id aliquip magna ad non pariatur qui Lorem quis cupidatat consequat enim.',
    photos: [
      'https://burst.shopifycdn.com/photos/macbook-air-on-desk.jpg?width=1200&format=pjpg&exif=1&iptc=1',
      'https://images.ctfassets.net/pdf29us7flmy/4JU61ygq6O2SH7JFL4Kmwq/a414c63b49c1a13656cbde5f66597c55/shutterstock_1073291759_optimized__1_.jpeg?w=720&q=100&fm=jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIERfGCshzboAIpO4IHgnYoCrQYfTIDF-z2Q&usqp=CAU',
      'https://englishlive.ef.com/blog/wp-content/uploads/sites/2/2014/06/work.jpg',
      'https://www.jobberman.com/discover/wp-content/uploads/2018/05/BlogArticle_images_Passion_For_Work_Sets_Your_Attitude_Straight.png',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSklkvXzvTaVBh2MzYJvpoWfD-LAirbcjaKow&usqp=CAU',
      'https://www.verywellmind.com/thmb/yLDypwyc3u3RB_V1MAk3gPHDvUM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Man-multitasking-at-work-97168efba2a54bd9b351ac2b6a7e16f5.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsRndwQY7mycKJf1TZtWHNP4QhL0pOD9BVQPRP5yWGNLL30vvlda3prDwROHesf0wTUAU&usqp=CAU',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6as1MqQ4FAE7zuVUqqdEGBbZwb4pmkLa9iQ&usqp=CAU',
    ],
    vehicle: 'Bike',
    averageRating: 5,
    contracts: [],
    isVerified: true,
    wallet:  mongoose.Types.ObjectId.createFromHexString(
      '64dd92f71c8fbdf37da82771'
    ),
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64b25c28e5533a086228f4e7'
    ),
    username: 'bao1',
    firstName: 'Bao',
    lastName: 'Nguyen',
    dateOfBirth: '1993-02-11',
    email: 'bao1@gmail.com',
    phoneNumber: '0123456789',
    gender: 'Male',
    image: 'https://res.cloudinary.com/dxohnl1zt/image/upload/v1690822142/userAvatar/ryuaapki5tmic26nzwn2.jpg',
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
    reviews: [
      mongoose.Types.ObjectId.createFromHexString('64a029cd505314a289b1c18d'),
    ],
    aboutMe:
      'Ex tempor exercitation aliqua eiusmod. Sint exercitation exercitation Lorem velit labore proident Lorem quis fugiat. Velit Lorem consequat laboris adipisicing ex ut aliqua ut et et qui. Sint cillum cupidatat non proident do in esse amet ex ullamco id cillum deserunt. Esse velit irure sint veniam mollit aute aliqua eu aliquip Lorem ad. Consectetur velit consectetur fugiat amet pariatur eiusmod.',
    skillAndExperience:
      'Magna dolor officia consequat cupidatat nostrud. In proident ex irure reprehenderit do adipisicing sunt ullamco mollit proident dolor voluptate elit. Eu adipisicing elit enim elit nulla laborum. Mollit fugiat consectetur cillum elit nisi cupidatat occaecat. Ea deserunt exercitation laborum enim aute et aliqua aliqua adipisicing incididunt est laboris. Incididunt est et proident excepteur reprehenderit eiusmod proident laboris consequat anim sint mollit consectetur. Ipsum tempor id aliquip magna ad non pariatur qui Lorem quis cupidatat consequat enim.',
    photos: [
      'https://burst.shopifycdn.com/photos/macbook-air-on-desk.jpg?width=1200&format=pjpg&exif=1&iptc=1',
      'https://images.ctfassets.net/pdf29us7flmy/4JU61ygq6O2SH7JFL4Kmwq/a414c63b49c1a13656cbde5f66597c55/shutterstock_1073291759_optimized__1_.jpeg?w=720&q=100&fm=jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIERfGCshzboAIpO4IHgnYoCrQYfTIDF-z2Q&usqp=CAU',
      'https://englishlive.ef.com/blog/wp-content/uploads/sites/2/2014/06/work.jpg',
      'https://www.jobberman.com/discover/wp-content/uploads/2018/05/BlogArticle_images_Passion_For_Work_Sets_Your_Attitude_Straight.png',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSklkvXzvTaVBh2MzYJvpoWfD-LAirbcjaKow&usqp=CAU',
      'https://www.verywellmind.com/thmb/yLDypwyc3u3RB_V1MAk3gPHDvUM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Man-multitasking-at-work-97168efba2a54bd9b351ac2b6a7e16f5.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsRndwQY7mycKJf1TZtWHNP4QhL0pOD9BVQPRP5yWGNLL30vvlda3prDwROHesf0wTUAU&usqp=CAU',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6as1MqQ4FAE7zuVUqqdEGBbZwb4pmkLa9iQ&usqp=CAU',
    ],
    vehicle: 'Bike',
    averageRating: 5,
    contracts: [],
    isVerified: true,
    wallet:  mongoose.Types.ObjectId.createFromHexString(
      '64dd934a11e7450d2ee15f4d'
    ),
  },
  {
    username: 'ly1',
    firstName: 'Ly',
    lastName: 'Nguyen',
    dateOfBirth: '1993-02-11',
    email: 'ly1@gmail.com',
    phoneNumber: '0123456789',
    gender: 'Female',
    image: 'https://res.cloudinary.com/dxohnl1zt/image/upload/v1690822142/userAvatar/ryuaapki5tmic26nzwn2.jpg',
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
    unavailableTime: [
      {
        from : new Date(2023, 8, 29, 10, 0, 0, 0),
        to: new Date(2023, 8, 29, 13, 0, 0, 0),
      },
      {
        from : new Date(2023, 8, 30, 10, 0, 0, 0),
        to: new Date(2023, 8, 30, 13, 0, 0, 0),
      },
    ],
    reviews: [
      mongoose.Types.ObjectId.createFromHexString('64a029cd505314a289b1c18d'),
    ],
    aboutMe:
      'Ex tempor exercitation aliqua eiusmod. Sint exercitation exercitation Lorem velit labore proident Lorem quis fugiat. Velit Lorem consequat laboris adipisicing ex ut aliqua ut et et qui. Sint cillum cupidatat non proident do in esse amet ex ullamco id cillum deserunt. Esse velit irure sint veniam mollit aute aliqua eu aliquip Lorem ad. Consectetur velit consectetur fugiat amet pariatur eiusmod.',
    skillAndExperience:
      'Magna dolor officia consequat cupidatat nostrud. In proident ex irure reprehenderit do adipisicing sunt ullamco mollit proident dolor voluptate elit. Eu adipisicing elit enim elit nulla laborum. Mollit fugiat consectetur cillum elit nisi cupidatat occaecat. Ea deserunt exercitation laborum enim aute et aliqua aliqua adipisicing incididunt est laboris. Incididunt est et proident excepteur reprehenderit eiusmod proident laboris consequat anim sint mollit consectetur. Ipsum tempor id aliquip magna ad non pariatur qui Lorem quis cupidatat consequat enim.',
    photos: [
      'https://burst.shopifycdn.com/photos/macbook-air-on-desk.jpg?width=1200&format=pjpg&exif=1&iptc=1',
      'https://images.ctfassets.net/pdf29us7flmy/4JU61ygq6O2SH7JFL4Kmwq/a414c63b49c1a13656cbde5f66597c55/shutterstock_1073291759_optimized__1_.jpeg?w=720&q=100&fm=jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIERfGCshzboAIpO4IHgnYoCrQYfTIDF-z2Q&usqp=CAU',
      'https://englishlive.ef.com/blog/wp-content/uploads/sites/2/2014/06/work.jpg',
      'https://www.jobberman.com/discover/wp-content/uploads/2018/05/BlogArticle_images_Passion_For_Work_Sets_Your_Attitude_Straight.png',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSklkvXzvTaVBh2MzYJvpoWfD-LAirbcjaKow&usqp=CAU',
      'https://www.verywellmind.com/thmb/yLDypwyc3u3RB_V1MAk3gPHDvUM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Man-multitasking-at-work-97168efba2a54bd9b351ac2b6a7e16f5.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsRndwQY7mycKJf1TZtWHNP4QhL0pOD9BVQPRP5yWGNLL30vvlda3prDwROHesf0wTUAU&usqp=CAU',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6as1MqQ4FAE7zuVUqqdEGBbZwb4pmkLa9iQ&usqp=CAU',
    ],
    vehicle: 'Bike',
    averageRating: 4,
    contracts: [],
    isVerified: true,
    wallet:  mongoose.Types.ObjectId.createFromHexString(
      '64dd937455b4a52823412337'
    ),
  },
  {
    username: 'hai122',
    firstName: 'Hai',
    lastName: 'Nguyen',
    dateOfBirth: '1993-02-11',
    email: 'hai122@gmail.com',
    phoneNumber: '0123456789',
    gender: 'Female',
    image: 'https://res.cloudinary.com/dxohnl1zt/image/upload/v1690822142/userAvatar/ryuaapki5tmic26nzwn2.jpg',
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
    unavailableTime: [
      {
        from : new Date(2023, 8, 30, 10, 0, 0, 0),
        to: new Date(2023, 8, 30, 13, 0, 0, 0),
      },
      {
        from : new Date(2023, 9, 1, 10, 0, 0, 0),
        to: new Date(2023, 9, 1, 13, 0, 0, 0),
      },
    ],
    reviews: [
      mongoose.Types.ObjectId.createFromHexString('64a029cd505314a289b1c18d'),
    ],
    aboutMe:
      'Ex tempor exercitation aliqua eiusmod. Sint exercitation exercitation Lorem velit labore proident Lorem quis fugiat. Velit Lorem consequat laboris adipisicing ex ut aliqua ut et et qui. Sint cillum cupidatat non proident do in esse amet ex ullamco id cillum deserunt. Esse velit irure sint veniam mollit aute aliqua eu aliquip Lorem ad. Consectetur velit consectetur fugiat amet pariatur eiusmod.',
    skillAndExperience:
      'Magna dolor officia consequat cupidatat nostrud. In proident ex irure reprehenderit do adipisicing sunt ullamco mollit proident dolor voluptate elit. Eu adipisicing elit enim elit nulla laborum. Mollit fugiat consectetur cillum elit nisi cupidatat occaecat. Ea deserunt exercitation laborum enim aute et aliqua aliqua adipisicing incididunt est laboris. Incididunt est et proident excepteur reprehenderit eiusmod proident laboris consequat anim sint mollit consectetur. Ipsum tempor id aliquip magna ad non pariatur qui Lorem quis cupidatat consequat enim.',
    photos: [],
    vehicle: 'Bike',
    averageRating: 4.4,
    contracts: [],
    isVerified: true,
    wallet:  mongoose.Types.ObjectId.createFromHexString(
      '64dd93875e7bdfe4dda87704'
    ),
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
    reviews: [
      mongoose.Types.ObjectId.createFromHexString('64a029cd505314a289b1c18d'),
    ],
    aboutMe:
      'Ex tempor exercitation aliqua eiusmod. Sint exercitation exercitation Lorem velit labore proident Lorem quis fugiat. Velit Lorem consequat laboris adipisicing ex ut aliqua ut et et qui. Sint cillum cupidatat non proident do in esse amet ex ullamco id cillum deserunt. Esse velit irure sint veniam mollit aute aliqua eu aliquip Lorem ad. Consectetur velit consectetur fugiat amet pariatur eiusmod.',
    skillAndExperience:
      'Magna dolor officia consequat cupidatat nostrud. In proident ex irure reprehenderit do adipisicing sunt ullamco mollit proident dolor voluptate elit. Eu adipisicing elit enim elit nulla laborum. Mollit fugiat consectetur cillum elit nisi cupidatat occaecat. Ea deserunt exercitation laborum enim aute et aliqua aliqua adipisicing incididunt est laboris. Incididunt est et proident excepteur reprehenderit eiusmod proident laboris consequat anim sint mollit consectetur. Ipsum tempor id aliquip magna ad non pariatur qui Lorem quis cupidatat consequat enim.',
    photos: [],
    vehicle: 'Bike',
    averageRating: 3,
    contracts: [],
    isVerified: true,
    wallet:  mongoose.Types.ObjectId.createFromHexString(
      '64dd939d45366be8233e1fa1'
    ),
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
    reviews: [
      mongoose.Types.ObjectId.createFromHexString('64a029cd505314a289b1c18d'),
    ],
    aboutMe:
      'Ex tempor exercitation aliqua eiusmod. Sint exercitation exercitation Lorem velit labore proident Lorem quis fugiat. Velit Lorem consequat laboris adipisicing ex ut aliqua ut et et qui. Sint cillum cupidatat non proident do in esse amet ex ullamco id cillum deserunt. Esse velit irure sint veniam mollit aute aliqua eu aliquip Lorem ad. Consectetur velit consectetur fugiat amet pariatur eiusmod.',
    skillAndExperience:
      'Magna dolor officia consequat cupidatat nostrud. In proident ex irure reprehenderit do adipisicing sunt ullamco mollit proident dolor voluptate elit. Eu adipisicing elit enim elit nulla laborum. Mollit fugiat consectetur cillum elit nisi cupidatat occaecat. Ea deserunt exercitation laborum enim aute et aliqua aliqua adipisicing incididunt est laboris. Incididunt est et proident excepteur reprehenderit eiusmod proident laboris consequat anim sint mollit consectetur. Ipsum tempor id aliquip magna ad non pariatur qui Lorem quis cupidatat consequat enim.',
    photos: [],
    vehicle: 'Bike',
    averageRating: 3.8,
    contracts: [],
    isVerified: true,
    wallet:  mongoose.Types.ObjectId.createFromHexString(
      '64dd93b2ed3a3d38ac32ec6e'
    ),
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
    reviews: [
      mongoose.Types.ObjectId.createFromHexString('64a029d2f3638096a8cf4de7'),
    ],
    aboutMe:
      'Ex tempor exercitation aliqua eiusmod. Sint exercitation exercitation Lorem velit labore proident Lorem quis fugiat. Velit Lorem consequat laboris adipisicing ex ut aliqua ut et et qui. Sint cillum cupidatat non proident do in esse amet ex ullamco id cillum deserunt. Esse velit irure sint veniam mollit aute aliqua eu aliquip Lorem ad. Consectetur velit consectetur fugiat amet pariatur eiusmod.',
    skillAndExperience:
      'Magna dolor officia consequat cupidatat nostrud. In proident ex irure reprehenderit do adipisicing sunt ullamco mollit proident dolor voluptate elit. Eu adipisicing elit enim elit nulla laborum. Mollit fugiat consectetur cillum elit nisi cupidatat occaecat. Ea deserunt exercitation laborum enim aute et aliqua aliqua adipisicing incididunt est laboris. Incididunt est et proident excepteur reprehenderit eiusmod proident laboris consequat anim sint mollit consectetur. Ipsum tempor id aliquip magna ad non pariatur qui Lorem quis cupidatat consequat enim.',
    photos: [],
    vehicle: 'Bike',
    averageRating: 3.5,
    contracts: [],
    wallet:  mongoose.Types.ObjectId.createFromHexString(
      '64dd93c6d65cdcfa85b3a865'
    ),
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
    reviews: [
      mongoose.Types.ObjectId.createFromHexString('64a02b8ba2ea157ee7bcca69'),
    ],
    aboutMe:
      'Ex tempor exercitation aliqua eiusmod. Sint exercitation exercitation Lorem velit labore proident Lorem quis fugiat. Velit Lorem consequat laboris adipisicing ex ut aliqua ut et et qui. Sint cillum cupidatat non proident do in esse amet ex ullamco id cillum deserunt. Esse velit irure sint veniam mollit aute aliqua eu aliquip Lorem ad. Consectetur velit consectetur fugiat amet pariatur eiusmod.',
    skillAndExperience:
      'Magna dolor officia consequat cupidatat nostrud. In proident ex irure reprehenderit do adipisicing sunt ullamco mollit proident dolor voluptate elit. Eu adipisicing elit enim elit nulla laborum. Mollit fugiat consectetur cillum elit nisi cupidatat occaecat. Ea deserunt exercitation laborum enim aute et aliqua aliqua adipisicing incididunt est laboris. Incididunt est et proident excepteur reprehenderit eiusmod proident laboris consequat anim sint mollit consectetur. Ipsum tempor id aliquip magna ad non pariatur qui Lorem quis cupidatat consequat enim.',
    photos: [],
    vehicle: 'Bike',
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
    reviews: [
      mongoose.Types.ObjectId.createFromHexString('64a02beae0dd076a732bc0f2'),
    ],
    aboutMe:
      'Ex tempor exercitation aliqua eiusmod. Sint exercitation exercitation Lorem velit labore proident Lorem quis fugiat. Velit Lorem consequat laboris adipisicing ex ut aliqua ut et et qui. Sint cillum cupidatat non proident do in esse amet ex ullamco id cillum deserunt. Esse velit irure sint veniam mollit aute aliqua eu aliquip Lorem ad. Consectetur velit consectetur fugiat amet pariatur eiusmod.',
    skillAndExperience:
      'Magna dolor officia consequat cupidatat nostrud. In proident ex irure reprehenderit do adipisicing sunt ullamco mollit proident dolor voluptate elit. Eu adipisicing elit enim elit nulla laborum. Mollit fugiat consectetur cillum elit nisi cupidatat occaecat. Ea deserunt exercitation laborum enim aute et aliqua aliqua adipisicing incididunt est laboris. Incididunt est et proident excepteur reprehenderit eiusmod proident laboris consequat anim sint mollit consectetur. Ipsum tempor id aliquip magna ad non pariatur qui Lorem quis cupidatat consequat enim.',
    photos: [],
    vehicle: 'Bike',
    contracts: [],
    averageRating: 4.5,
    isVerified: true,
    wallet:  mongoose.Types.ObjectId.createFromHexString(
      '64dd93d936827abbd7de8667'
    ),
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
    reviews: [
      mongoose.Types.ObjectId.createFromHexString('64a02c4f152570b13b56613a'),
    ],
    aboutMe:
      'Ex tempor exercitation aliqua eiusmod. Sint exercitation exercitation Lorem velit labore proident Lorem quis fugiat. Velit Lorem consequat laboris adipisicing ex ut aliqua ut et et qui. Sint cillum cupidatat non proident do in esse amet ex ullamco id cillum deserunt. Esse velit irure sint veniam mollit aute aliqua eu aliquip Lorem ad. Consectetur velit consectetur fugiat amet pariatur eiusmod.',
    skillAndExperience:
      'Magna dolor officia consequat cupidatat nostrud. In proident ex irure reprehenderit do adipisicing sunt ullamco mollit proident dolor voluptate elit. Eu adipisicing elit enim elit nulla laborum. Mollit fugiat consectetur cillum elit nisi cupidatat occaecat. Ea deserunt exercitation laborum enim aute et aliqua aliqua adipisicing incididunt est laboris. Incididunt est et proident excepteur reprehenderit eiusmod proident laboris consequat anim sint mollit consectetur. Ipsum tempor id aliquip magna ad non pariatur qui Lorem quis cupidatat consequat enim.',
    photos: [],
    vehicle: 'Bike',
    contracts: [],
    averageRating: 3.5,
    wallet:  mongoose.Types.ObjectId.createFromHexString(
      '64dd93ee4717938968bd230c'
    ),
  },
];

module.exports = taskers;
