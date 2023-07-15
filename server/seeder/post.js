const mongoose = require('mongoose');

const posts = [
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64ae6134734cef8f2296cac8'
    ),
    user: mongoose.Types.ObjectId.createFromHexString(
      '64a0163810f4179aa8f4c7b3'
    ),
    taskTag: mongoose.Types.ObjectId.createFromHexString(
      '64a0163810f4179aa8f4c7b3'
    ),
    text: 'Aliquip Lorem laboris et anim ipsum tempor. Proident ex non cillum nisi nisi tempor velit nulla reprehenderit sit sint quis. Nisi eu deserunt aliquip ea sunt mollit. Proident cupidatat sint ad esse eu voluptate. Ut dolor proident nulla proident duis. Proident ea laboris deserunt quis. Aliquip cupidatat cillum velit irure.',
    candidate: [{
      user: mongoose.Types.ObjectId.createFromHexString(
        '64b253f56dc6525e4693f475'
      ),
      text: 'abc',
      price: 100
    }]
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64ae635b5c23aa06d7f5f150'
    ),
    user: mongoose.Types.ObjectId.createFromHexString(
      '64a0253cb15f282da8c2f4e5'
    ),
    taskTag: mongoose.Types.ObjectId.createFromHexString(
      '64a0163810f4179aa8f4c7b3'
    ),
    text: 'Aliquip Lorem laboris et anim ipsum tempor. Proident ex non cillum nisi nisi tempor velit nulla reprehenderit sit sint quis. Nisi eu deserunt aliquip ea sunt mollit. Proident cupidatat sint ad esse eu voluptate. Ut dolor proident nulla proident duis. Proident ea laboris deserunt quis. Aliquip cupidatat cillum velit irure.',
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64ae6374b02a68abdff2b349'
    ),
    user: mongoose.Types.ObjectId.createFromHexString(
      '64a0253cb15f282da8c2f4e5'
    ),
    taskTag: mongoose.Types.ObjectId.createFromHexString(
      '64a0163810f4179aa8f4c7b3'
    ),
    text: 'Aliquip Lorem laboris et anim ipsum tempor. Proident ex non cillum nisi nisi tempor velit nulla reprehenderit sit sint quis. Nisi eu deserunt aliquip ea sunt mollit. Proident cupidatat sint ad esse eu voluptate. Ut dolor proident nulla proident duis. Proident ea laboris deserunt quis. Aliquip cupidatat cillum velit irure.',
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64ae6378616736ebf66202cb'
    ),
    user: mongoose.Types.ObjectId.createFromHexString(
      '64a025d4dd3ba65774131d6d'
    ),
    taskTag: mongoose.Types.ObjectId.createFromHexString(
      '64a0163810f4179aa8f4c7b3'
    ),
    text: 'Aliquip Lorem laboris et anim ipsum tempor. Proident ex non cillum nisi nisi tempor velit nulla reprehenderit sit sint quis. Nisi eu deserunt aliquip ea sunt mollit. Proident cupidatat sint ad esse eu voluptate. Ut dolor proident nulla proident duis. Proident ea laboris deserunt quis. Aliquip cupidatat cillum velit irure.',
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64ae637e44ac82f12ee56bf5'
    ),
    user: mongoose.Types.ObjectId.createFromHexString(
      '64a025d4dd3ba65774131d6d'
    ),
    taskTag: mongoose.Types.ObjectId.createFromHexString(
      '64a01c50024571ad8ba9e11e'
    ),
    text: 'Aliquip Lorem laboris et anim ipsum tempor. Proident ex non cillum nisi nisi tempor velit nulla reprehenderit sit sint quis. Nisi eu deserunt aliquip ea sunt mollit. Proident cupidatat sint ad esse eu voluptate. Ut dolor proident nulla proident duis. Proident ea laboris deserunt quis. Aliquip cupidatat cillum velit irure.',
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64ae6385705db7aa3fcfc6a0'
    ),
    user: mongoose.Types.ObjectId.createFromHexString(
      '64a02850c21039353808b262'
    ),
    taskTag: mongoose.Types.ObjectId.createFromHexString(
      '64a01c324227a31165bc4bfb'
    ),
    text: 'Aliquip Lorem laboris et anim ipsum tempor. Proident ex non cillum nisi nisi tempor velit nulla reprehenderit sit sint quis. Nisi eu deserunt aliquip ea sunt mollit. Proident cupidatat sint ad esse eu voluptate. Ut dolor proident nulla proident duis. Proident ea laboris deserunt quis. Aliquip cupidatat cillum velit irure.',
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64ae638a9731c282a5702a8f'
    ),
    user: mongoose.Types.ObjectId.createFromHexString(
      '64a027923cdccf1afc84c413'
    ),
    taskTag: mongoose.Types.ObjectId.createFromHexString(
      '64a01c237aa7438ccab0850b'
    ),
    text: 'Aliquip Lorem laboris et anim ipsum tempor. Proident ex non cillum nisi nisi tempor velit nulla reprehenderit sit sint quis. Nisi eu deserunt aliquip ea sunt mollit. Proident cupidatat sint ad esse eu voluptate. Ut dolor proident nulla proident duis. Proident ea laboris deserunt quis. Aliquip cupidatat cillum velit irure.',
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64ae6390eedaa516979f7ba8'
    ),
    user: mongoose.Types.ObjectId.createFromHexString(
      '64a027923cdccf1afc84c413'
    ),
    taskTag: mongoose.Types.ObjectId.createFromHexString(
      '64a01990544c07c755c71904'
    ),
    text: 'Aliquip Lorem laboris et anim ipsum tempor. Proident ex non cillum nisi nisi tempor velit nulla reprehenderit sit sint quis. Nisi eu deserunt aliquip ea sunt mollit. Proident cupidatat sint ad esse eu voluptate. Ut dolor proident nulla proident duis. Proident ea laboris deserunt quis. Aliquip cupidatat cillum velit irure.',
  },
];

module.exports = posts;
