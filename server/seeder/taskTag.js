const mongoose = require('mongoose');

const taskTags = [
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64a0163810f4179aa8f4c7b3'
    ),
    title: 'Errands',
    description:
      'Ex velit aliquip cillum duis ut nisi ipsum. Id laborum esse cupidatat ut aliquip veniam fugiat dolore et. Sit amet aliquip sit nisi qui. Minim id culpa excepteur duis ullamco in.',
    langKey: 'th_task_errands',
    avgPrice: [5, 30],
    defaultPrice: 6.12,
    photo: '',
  },

  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64a01990544c07c755c71904'
    ),
    title: 'Help Moving',
    description:
      'Ex velit aliquip cillum duis ut nisi ipsum. Id laborum esse cupidatat ut aliquip veniam fugiat dolore et. Sit amet aliquip sit nisi qui. Minim id culpa excepteur duis ullamco in.',
    langKey: 'th_task_helpmoving',
    avgPrice: [10, 60],
    defaultPrice: 20.87,
    photo: '',
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64a01c237aa7438ccab0850b'
    ),
    title: 'Electrical Help',
    description:
      'Ex velit aliquip cillum duis ut nisi ipsum. Id laborum esse cupidatat ut aliquip veniam fugiat dolore et. Sit amet aliquip sit nisi qui. Minim id culpa excepteur duis ullamco in.',
    langKey: 'th_task_electricalhelp',
    avgPrice: [20, 100],
    defaultPrice: 40.77,
    photo: '',
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64a01c324227a31165bc4bfb'
    ),
    title: 'Cleaning',
    description:
      'Ex velit aliquip cillum duis ut nisi ipsum. Id laborum esse cupidatat ut aliquip veniam fugiat dolore et. Sit amet aliquip sit nisi qui. Minim id culpa excepteur duis ullamco in.',
    langKey: 'th_task_cleaning',
    avgPrice: [10, 100],
    defaultPrice: 30.11,
    photo: '',
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64a01c50024571ad8ba9e11e'
    ),
    title: 'General Mounting',
    description:
      'Ex velit aliquip cillum duis ut nisi ipsum. Id laborum esse cupidatat ut aliquip veniam fugiat dolore et. Sit amet aliquip sit nisi qui. Minim id culpa excepteur duis ullamco in.',
    langKey: 'th_task_generalmounting',
    avgPrice: [50, 500],
    defaultPrice: 100,
    photo: '',
  },
  // {
  //   _id: mongoose.Types.ObjectId.createFromHexString('64a01c761fe09018757edb79'),
  //   title: 'Furniture Assembly',
  //   description:
  //     'Ex velit aliquip cillum duis ut nisi ipsum. Id laborum esse cupidatat ut aliquip veniam fugiat dolore et. Sit amet aliquip sit nisi qui. Minim id culpa excepteur duis ullamco in.',
  //   langKey: 'th_task_furnitureassembly',
  //   avgPrice: [100, 500],
  //   defaultPrice: 200,
  //   photo: '',
  // },
  // {
  //   _id: mongoose.Types.ObjectId.createFromHexString('64a01c8a3da012c6a63faad6'),
  //   title: 'Gardening',
  //   description:
  //     'Ex velit aliquip cillum duis ut nisi ipsum. Id laborum esse cupidatat ut aliquip veniam fugiat dolore et. Sit amet aliquip sit nisi qui. Minim id culpa excepteur duis ullamco in.',
  //   langKey: 'th_task_yarkworkgardening',
  //   avgPrice: [50, 500],
  //   defaultPrice: 100,
  //   photo: '',
  // },
  // {
  //   _id: mongoose.Types.ObjectId.createFromHexString('64a01ca7c441b70a7c19f868'),
  //   title: 'Shipping',
  //   description:
  //     'Ex velit aliquip cillum duis ut nisi ipsum. Id laborum esse cupidatat ut aliquip veniam fugiat dolore et. Sit amet aliquip sit nisi qui. Minim id culpa excepteur duis ullamco in.',
  //   langKey: 'th_task_shipping',
  //   avgPrice: [5, 100],
  //   defaultPrice: 20.76,
  //   photo: '',
  // },
];

module.exports = taskTags;
