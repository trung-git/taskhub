const mongoose = require('mongoose');

const finders = [
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64a029cd505314a289b1c18d'
    ),
    rating: 4,
    review: 'Reprehenderit deserunt reprehenderit ipsum amet.',
    taskTag: mongoose.Types.ObjectId.createFromHexString(
      '64a0163810f4179aa8f4c7b3'
    ), // Errands
    user: mongoose.Types.ObjectId.createFromHexString(
      '64a0163810f4179aa8f4c7b3'
    ), // tien11F
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64a029d2f3638096a8cf4de7'
    ),
    rating: 5,
    review: 'Reprehenderit deserunt reprehenderit ipsum amet.',
    taskTag: mongoose.Types.ObjectId.createFromHexString(
      '64a01990544c07c755c71904'
    ), // Help Moving
    user: mongoose.Types.ObjectId.createFromHexString(
      '64a0253cb15f282da8c2f4e5'
    ), // hai2
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64a02b8ba2ea157ee7bcca69'
    ),
    rating: 4,
    review: 'Reprehenderit deserunt reprehenderit ipsum amet.',
    taskTag: mongoose.Types.ObjectId.createFromHexString(
      '64a01c237aa7438ccab0850b'
    ), // Electrical Help
    user: mongoose.Types.ObjectId.createFromHexString(
      '64a025d4dd3ba65774131d6d'
    ), // ngan222
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64a02beae0dd076a732bc0f2'
    ),
    rating: 5,
    review: 'Reprehenderit deserunt reprehenderit ipsum amet.',
    taskTag: mongoose.Types.ObjectId.createFromHexString(
      '64a01c324227a31165bc4bfb'
    ), // Cleaning
    user: mongoose.Types.ObjectId.createFromHexString(
      '64a027923cdccf1afc84c413'
    ), // mai120
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64a02c4f152570b13b56613a'
    ),
    rating: 5,
    review: 'Reprehenderit deserunt reprehenderit ipsum amet.',
    taskTag: mongoose.Types.ObjectId.createFromHexString(
      '64a01c761fe09018757edb79'
    ), // Furniture Assembly
    user: mongoose.Types.ObjectId.createFromHexString(
      '64a02850c21039353808b262'
    ), // luong123
  },
];

module.exports = finders;
