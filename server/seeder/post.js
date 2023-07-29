const mongoose = require('mongoose');

const posts = [
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64ae6134734cef8f2296cac8'
    ),
    user: mongoose.Types.ObjectId.createFromHexString(
      '64a02850c21039353808b262'
    ),
    taskTag: mongoose.Types.ObjectId.createFromHexString(
      '64a0163810f4179aa8f4c7b3'
    ),
    text: 'Aliquip Lorem laboris et anim ipsum tempor. Proident ex non cillum nisi nisi tempor velit nulla reprehenderit sit sint quis. Nisi eu deserunt aliquip ea sunt mollit. Proident cupidatat sint ad esse eu voluptate. Ut dolor proident nulla proident duis. Proident ea laboris deserunt quis. Aliquip cupidatat cillum velit irure.',
    photos:[
      "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpm0AXv9uGZD7IQKGrI10kmGPXytkQxo_t_gWCJvbt6QFL9VcWHCBnLT3sF2OXrv6xme4&usqp=CAU",
      "https://img.freepik.com/premium-photo/image-colorful-galaxy-sky-generative-ai_791316-9864.jpg?w=2000",
      "https://imgv3.fotor.com/images/cover-photo-image/a-beautiful-girl-with-gray-hair-and-lucxy-neckless-generated-by-Fotor-AI.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrTFrhr_-pYR74jUgOy7IerAoHAX3zPIZZcg&usqp=CAU"
    ],
    candidate: [
      {
        user: mongoose.Types.ObjectId.createFromHexString(
          '64b25c28e5533a086228f4e7'
        ),
        text: 'abc',
        price: 100,
      },
      {
        user: mongoose.Types.ObjectId.createFromHexString(
          '64b253f56dc6525e4693f475'
        ),
        text: 'a1111bc',
        price: 2,
      },
    ],
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64ae635b5c23aa06d7f5f150'
    ),
    user: mongoose.Types.ObjectId.createFromHexString(
      '64a0253cb15f282da8c2f4e5'
    ),
    photos:[
      "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpm0AXv9uGZD7IQKGrI10kmGPXytkQxo_t_gWCJvbt6QFL9VcWHCBnLT3sF2OXrv6xme4&usqp=CAU",
      "https://img.freepik.com/premium-photo/image-colorful-galaxy-sky-generative-ai_791316-9864.jpg?w=2000",
      "https://imgv3.fotor.com/images/cover-photo-image/a-beautiful-girl-with-gray-hair-and-lucxy-neckless-generated-by-Fotor-AI.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrTFrhr_-pYR74jUgOy7IerAoHAX3zPIZZcg&usqp=CAU"
    ],
    taskTag: mongoose.Types.ObjectId.createFromHexString(
      '64a0163810f4179aa8f4c7b3'
    ),
    text: 'Aliquip Lorem laboris et anim ipsum tempor. Proident ex non cillum nisi nisi tempor velit nulla reprehenderit sit sint quis. Nisi eu deserunt aliquip ea sunt mollit. Proident cupidatat sint ad esse eu voluptate. Ut dolor proident nulla proident duis. Proident ea laboris deserunt quis. Aliquip cupidatat cillum velit irure.',
    candidate: [
      {
        user: mongoose.Types.ObjectId.createFromHexString(
          '64b25c28e5533a086228f4e7'
        ),
        text: 'abc',
        price: 100,
      },
    ],
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64ae6374b02a68abdff2b349'
    ),
    user: mongoose.Types.ObjectId.createFromHexString(
      '64a0253cb15f282da8c2f4e5'
    ),
    photos:[
      "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpm0AXv9uGZD7IQKGrI10kmGPXytkQxo_t_gWCJvbt6QFL9VcWHCBnLT3sF2OXrv6xme4&usqp=CAU",
      "https://img.freepik.com/premium-photo/image-colorful-galaxy-sky-generative-ai_791316-9864.jpg?w=2000",
      "https://imgv3.fotor.com/images/cover-photo-image/a-beautiful-girl-with-gray-hair-and-lucxy-neckless-generated-by-Fotor-AI.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrTFrhr_-pYR74jUgOy7IerAoHAX3zPIZZcg&usqp=CAU"
    ],
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
    photos:[
      "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpm0AXv9uGZD7IQKGrI10kmGPXytkQxo_t_gWCJvbt6QFL9VcWHCBnLT3sF2OXrv6xme4&usqp=CAU",
      "https://img.freepik.com/premium-photo/image-colorful-galaxy-sky-generative-ai_791316-9864.jpg?w=2000",
      "https://imgv3.fotor.com/images/cover-photo-image/a-beautiful-girl-with-gray-hair-and-lucxy-neckless-generated-by-Fotor-AI.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrTFrhr_-pYR74jUgOy7IerAoHAX3zPIZZcg&usqp=CAU"
    ],
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
    photos:[
      "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpm0AXv9uGZD7IQKGrI10kmGPXytkQxo_t_gWCJvbt6QFL9VcWHCBnLT3sF2OXrv6xme4&usqp=CAU",
      "https://img.freepik.com/premium-photo/image-colorful-galaxy-sky-generative-ai_791316-9864.jpg?w=2000",
      "https://imgv3.fotor.com/images/cover-photo-image/a-beautiful-girl-with-gray-hair-and-lucxy-neckless-generated-by-Fotor-AI.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrTFrhr_-pYR74jUgOy7IerAoHAX3zPIZZcg&usqp=CAU"
    ],
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
    photos:[
      "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpm0AXv9uGZD7IQKGrI10kmGPXytkQxo_t_gWCJvbt6QFL9VcWHCBnLT3sF2OXrv6xme4&usqp=CAU",
      "https://img.freepik.com/premium-photo/image-colorful-galaxy-sky-generative-ai_791316-9864.jpg?w=2000",
      "https://imgv3.fotor.com/images/cover-photo-image/a-beautiful-girl-with-gray-hair-and-lucxy-neckless-generated-by-Fotor-AI.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrTFrhr_-pYR74jUgOy7IerAoHAX3zPIZZcg&usqp=CAU"
    ],
    taskTag: mongoose.Types.ObjectId.createFromHexString(
      '64a01c324227a31165bc4bfb'
    ),
    text: 'Aliquip Lorem laboris et anim ipsum tempor. Proident ex non cillum nisi nisi tempor velit nulla reprehenderit sit sint quis. Nisi eu deserunt aliquip ea sunt mollit. Proident cupidatat sint ad esse eu voluptate. Ut dolor proident nulla proident duis. Proident ea laboris deserunt quis. Aliquip cupidatat cillum velit irure.',
  },
  {
    _id: mongoose.Types.ObjectId.createFromHexString(
      '64ae638a9731c282a5702a8f'
    ),
    photos:[
      "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpm0AXv9uGZD7IQKGrI10kmGPXytkQxo_t_gWCJvbt6QFL9VcWHCBnLT3sF2OXrv6xme4&usqp=CAU",
      "https://img.freepik.com/premium-photo/image-colorful-galaxy-sky-generative-ai_791316-9864.jpg?w=2000",
      "https://imgv3.fotor.com/images/cover-photo-image/a-beautiful-girl-with-gray-hair-and-lucxy-neckless-generated-by-Fotor-AI.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrTFrhr_-pYR74jUgOy7IerAoHAX3zPIZZcg&usqp=CAU"
    ],
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
    photos:[
      "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpm0AXv9uGZD7IQKGrI10kmGPXytkQxo_t_gWCJvbt6QFL9VcWHCBnLT3sF2OXrv6xme4&usqp=CAU",
      "https://img.freepik.com/premium-photo/image-colorful-galaxy-sky-generative-ai_791316-9864.jpg?w=2000",
      "https://imgv3.fotor.com/images/cover-photo-image/a-beautiful-girl-with-gray-hair-and-lucxy-neckless-generated-by-Fotor-AI.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrTFrhr_-pYR74jUgOy7IerAoHAX3zPIZZcg&usqp=CAU"
    ],
    user: mongoose.Types.ObjectId.createFromHexString(
      '64a027923cdccf1afc84c413'
    ),
    taskTag: mongoose.Types.ObjectId.createFromHexString(
      '64a01990544c07c755c71904'
    ),
    text: 'Aliquip Lorem laboris et anim ipsum tempor. Proident ex non cillum nisi nisi tempor velit nulla reprehenderit sit sint quis. Nisi eu deserunt aliquip ea sunt mollit. Proident cupidatat sint ad esse eu voluptate. Ut dolor proident nulla proident duis. Proident ea laboris deserunt quis. Aliquip cupidatat cillum velit irure.',
  },
  {
    user: mongoose.Types.ObjectId.createFromHexString(
      '64a02850c21039353808b262'
    ),
    taskTag: mongoose.Types.ObjectId.createFromHexString(
      '64a0163810f4179aa8f4c7b3'
    ),
    photos:[
      "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpm0AXv9uGZD7IQKGrI10kmGPXytkQxo_t_gWCJvbt6QFL9VcWHCBnLT3sF2OXrv6xme4&usqp=CAU",
      "https://img.freepik.com/premium-photo/image-colorful-galaxy-sky-generative-ai_791316-9864.jpg?w=2000",
      "https://imgv3.fotor.com/images/cover-photo-image/a-beautiful-girl-with-gray-hair-and-lucxy-neckless-generated-by-Fotor-AI.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrTFrhr_-pYR74jUgOy7IerAoHAX3zPIZZcg&usqp=CAU"
    ],
    text: 'Aliquip Lorem laboris et anim ipsum tempor. Proident ex non cillum nisi nisi tempor velit nulla reprehenderit sit sint quis. Nisi eu deserunt aliquip ea sunt mollit. Proident cupidatat sint ad esse eu voluptate. Ut dolor proident nulla proident duis. Proident ea laboris deserunt quis. Aliquip cupidatat cillum velit irure.',
    candidate: [
      {
        user: mongoose.Types.ObjectId.createFromHexString(
          '64b25c28e5533a086228f4e7'
        ),
        text: 'abc',
        price: 100,
      },
      {
        user: mongoose.Types.ObjectId.createFromHexString(
          '64b253f56dc6525e4693f475'
        ),
        text: 'a1111bc',
        price: 2,
      },
    ],
  },
  {
    user: mongoose.Types.ObjectId.createFromHexString(
      '64a02850c21039353808b262'
    ),
    photos:[
      "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpm0AXv9uGZD7IQKGrI10kmGPXytkQxo_t_gWCJvbt6QFL9VcWHCBnLT3sF2OXrv6xme4&usqp=CAU",
      "https://img.freepik.com/premium-photo/image-colorful-galaxy-sky-generative-ai_791316-9864.jpg?w=2000",
      "https://imgv3.fotor.com/images/cover-photo-image/a-beautiful-girl-with-gray-hair-and-lucxy-neckless-generated-by-Fotor-AI.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrTFrhr_-pYR74jUgOy7IerAoHAX3zPIZZcg&usqp=CAU"
    ],
    taskTag: mongoose.Types.ObjectId.createFromHexString(
      '64a0163810f4179aa8f4c7b3'
    ),
    text: 'Aliquip Lorem laboris et anim ipsum tempor. Proident ex non cillum nisi nisi tempor velit nulla reprehenderit sit sint quis. Nisi eu deserunt aliquip ea sunt mollit. Proident cupidatat sint ad esse eu voluptate. Ut dolor proident nulla proident duis. Proident ea laboris deserunt quis. Aliquip cupidatat cillum velit irure.',
    candidate: [
      {
        user: mongoose.Types.ObjectId.createFromHexString(
          '64b25c28e5533a086228f4e7'
        ),
        text: 'abc',
        price: 100,
      },
      {
        user: mongoose.Types.ObjectId.createFromHexString(
          '64b253f56dc6525e4693f475'
        ),
        text: 'a1111bc',
        price: 2,
      },
    ],
  },
  {
    user: mongoose.Types.ObjectId.createFromHexString(
      '64a02850c21039353808b262'
    ),
    taskTag: mongoose.Types.ObjectId.createFromHexString(
      '64a0163810f4179aa8f4c7b3'
    ),
    text: 'Aliquip Lorem laboris et anim ipsum tempor. Proident ex non cillum nisi nisi tempor velit nulla reprehenderit sit sint quis. Nisi eu deserunt aliquip ea sunt mollit. Proident cupidatat sint ad esse eu voluptate. Ut dolor proident nulla proident duis. Proident ea laboris deserunt quis. Aliquip cupidatat cillum velit irure.',
    candidate: [
      {
        user: mongoose.Types.ObjectId.createFromHexString(
          '64b25c28e5533a086228f4e7'
        ),
        text: 'abc',
        price: 100,
      },
      {
        user: mongoose.Types.ObjectId.createFromHexString(
          '64b253f56dc6525e4693f475'
        ),
        text: 'a1111bc',
        price: 2,
      },
    ],
  },
  {
    user: mongoose.Types.ObjectId.createFromHexString(
      '64a02850c21039353808b262'
    ),
    taskTag: mongoose.Types.ObjectId.createFromHexString(
      '64a0163810f4179aa8f4c7b3'
    ),
    text: 'Aliquip Lorem laboris et anim ipsum tempor. Proident ex non cillum nisi nisi tempor velit nulla reprehenderit sit sint quis. Nisi eu deserunt aliquip ea sunt mollit. Proident cupidatat sint ad esse eu voluptate. Ut dolor proident nulla proident duis. Proident ea laboris deserunt quis. Aliquip cupidatat cillum velit irure.',
    candidate: [
      {
        user: mongoose.Types.ObjectId.createFromHexString(
          '64b25c28e5533a086228f4e7'
        ),
        text: 'abc',
        price: 100,
      },
      {
        user: mongoose.Types.ObjectId.createFromHexString(
          '64b253f56dc6525e4693f475'
        ),
        text: 'a1111bc',
        price: 2,
      },
    ],
  },
  {
    user: mongoose.Types.ObjectId.createFromHexString(
      '64a02850c21039353808b262'
    ),
    taskTag: mongoose.Types.ObjectId.createFromHexString(
      '64a0163810f4179aa8f4c7b3'
    ),
    text: 'Aliquip Lorem laboris et anim ipsum tempor. Proident ex non cillum nisi nisi tempor velit nulla reprehenderit sit sint quis. Nisi eu deserunt aliquip ea sunt mollit. Proident cupidatat sint ad esse eu voluptate. Ut dolor proident nulla proident duis. Proident ea laboris deserunt quis. Aliquip cupidatat cillum velit irure.',
    candidate: [
      {
        user: mongoose.Types.ObjectId.createFromHexString(
          '64b25c28e5533a086228f4e7'
        ),
        text: 'abc',
        price: 100,
      },
      {
        user: mongoose.Types.ObjectId.createFromHexString(
          '64b253f56dc6525e4693f475'
        ),
        text: 'a1111bc',
        price: 2,
      },
    ],
  },
  {
    user: mongoose.Types.ObjectId.createFromHexString(
      '64a02850c21039353808b262'
    ),
    taskTag: mongoose.Types.ObjectId.createFromHexString(
      '64a0163810f4179aa8f4c7b3'
    ),
    text: 'Aliquip Lorem laboris et anim ipsum tempor. Proident ex non cillum nisi nisi tempor velit nulla reprehenderit sit sint quis. Nisi eu deserunt aliquip ea sunt mollit. Proident cupidatat sint ad esse eu voluptate. Ut dolor proident nulla proident duis. Proident ea laboris deserunt quis. Aliquip cupidatat cillum velit irure.',
    candidate: [
      {
        user: mongoose.Types.ObjectId.createFromHexString(
          '64b25c28e5533a086228f4e7'
        ),
        text: 'abc',
        price: 100,
      },
      {
        user: mongoose.Types.ObjectId.createFromHexString(
          '64b253f56dc6525e4693f475'
        ),
        text: 'a1111bc',
        price: 2,
      },
    ],
  },
  {
    user: mongoose.Types.ObjectId.createFromHexString(
      '64a02850c21039353808b262'
    ),
    taskTag: mongoose.Types.ObjectId.createFromHexString(
      '64a0163810f4179aa8f4c7b3'
    ),
    text: 'Aliquip Lorem laboris et anim ipsum tempor. Proident ex non cillum nisi nisi tempor velit nulla reprehenderit sit sint quis. Nisi eu deserunt aliquip ea sunt mollit. Proident cupidatat sint ad esse eu voluptate. Ut dolor proident nulla proident duis. Proident ea laboris deserunt quis. Aliquip cupidatat cillum velit irure.',
    candidate: [
      {
        user: mongoose.Types.ObjectId.createFromHexString(
          '64b25c28e5533a086228f4e7'
        ),
        text: 'abc',
        price: 100,
      },
      {
        user: mongoose.Types.ObjectId.createFromHexString(
          '64b253f56dc6525e4693f475'
        ),
        text: 'a1111bc',
        price: 2,
      },
    ],
  },
  {
    user: mongoose.Types.ObjectId.createFromHexString(
      '64a02850c21039353808b262'
    ),
    taskTag: mongoose.Types.ObjectId.createFromHexString(
      '64a0163810f4179aa8f4c7b3'
    ),
    text: 'Aliquip Lorem laboris et anim ipsum tempor. Proident ex non cillum nisi nisi tempor velit nulla reprehenderit sit sint quis. Nisi eu deserunt aliquip ea sunt mollit. Proident cupidatat sint ad esse eu voluptate. Ut dolor proident nulla proident duis. Proident ea laboris deserunt quis. Aliquip cupidatat cillum velit irure.',
    candidate: [
      {
        user: mongoose.Types.ObjectId.createFromHexString(
          '64b25c28e5533a086228f4e7'
        ),
        text: 'abc',
        price: 100,
      },
      {
        user: mongoose.Types.ObjectId.createFromHexString(
          '64b253f56dc6525e4693f475'
        ),
        text: 'a1111bc',
        price: 2,
      },
    ],
  },
  {
    user: mongoose.Types.ObjectId.createFromHexString(
      '64a02850c21039353808b262'
    ),
    taskTag: mongoose.Types.ObjectId.createFromHexString(
      '64a0163810f4179aa8f4c7b3'
    ),
    text: 'Aliquip Lorem laboris et anim ipsum tempor. Proident ex non cillum nisi nisi tempor velit nulla reprehenderit sit sint quis. Nisi eu deserunt aliquip ea sunt mollit. Proident cupidatat sint ad esse eu voluptate. Ut dolor proident nulla proident duis. Proident ea laboris deserunt quis. Aliquip cupidatat cillum velit irure.',
    candidate: [
      {
        user: mongoose.Types.ObjectId.createFromHexString(
          '64b25c28e5533a086228f4e7'
        ),
        text: 'abc',
        price: 100,
      },
      {
        user: mongoose.Types.ObjectId.createFromHexString(
          '64b253f56dc6525e4693f475'
        ),
        text: 'a1111bc',
        price: 2,
      },
    ],
  },
  {
    user: mongoose.Types.ObjectId.createFromHexString(
      '64a02850c21039353808b262'
    ),
    taskTag: mongoose.Types.ObjectId.createFromHexString(
      '64a0163810f4179aa8f4c7b3'
    ),
    text: 'Aliquip Lorem laboris et anim ipsum tempor. Proident ex non cillum nisi nisi tempor velit nulla reprehenderit sit sint quis. Nisi eu deserunt aliquip ea sunt mollit. Proident cupidatat sint ad esse eu voluptate. Ut dolor proident nulla proident duis. Proident ea laboris deserunt quis. Aliquip cupidatat cillum velit irure.',
    candidate: [
      {
        user: mongoose.Types.ObjectId.createFromHexString(
          '64b25c28e5533a086228f4e7'
        ),
        text: 'abc',
        price: 100,
      },
      {
        user: mongoose.Types.ObjectId.createFromHexString(
          '64b253f56dc6525e4693f475'
        ),
        text: 'a1111bc',
        price: 2,
      },
    ],
  },
  {
    user: mongoose.Types.ObjectId.createFromHexString(
      '64a02850c21039353808b262'
    ),
    taskTag: mongoose.Types.ObjectId.createFromHexString(
      '64a0163810f4179aa8f4c7b3'
    ),
    text: 'Aliquip Lorem laboris et anim ipsum tempor. Proident ex non cillum nisi nisi tempor velit nulla reprehenderit sit sint quis. Nisi eu deserunt aliquip ea sunt mollit. Proident cupidatat sint ad esse eu voluptate. Ut dolor proident nulla proident duis. Proident ea laboris deserunt quis. Aliquip cupidatat cillum velit irure.',
    candidate: [
      {
        user: mongoose.Types.ObjectId.createFromHexString(
          '64b25c28e5533a086228f4e7'
        ),
        text: 'abc',
        price: 100,
      },
      {
        user: mongoose.Types.ObjectId.createFromHexString(
          '64b253f56dc6525e4693f475'
        ),
        text: 'a1111bc',
        price: 2,
      },
    ],
  },
  {
    user: mongoose.Types.ObjectId.createFromHexString(
      '64a02850c21039353808b262'
    ),
    taskTag: mongoose.Types.ObjectId.createFromHexString(
      '64a0163810f4179aa8f4c7b3'
    ),
    text: 'Aliquip Lorem laboris et anim ipsum tempor. Proident ex non cillum nisi nisi tempor velit nulla reprehenderit sit sint quis. Nisi eu deserunt aliquip ea sunt mollit. Proident cupidatat sint ad esse eu voluptate. Ut dolor proident nulla proident duis. Proident ea laboris deserunt quis. Aliquip cupidatat cillum velit irure.',
    candidate: [
      {
        user: mongoose.Types.ObjectId.createFromHexString(
          '64b25c28e5533a086228f4e7'
        ),
        text: 'abc',
        price: 100,
      },
      {
        user: mongoose.Types.ObjectId.createFromHexString(
          '64b253f56dc6525e4693f475'
        ),
        text: 'a1111bc',
        price: 2,
      },
    ],
  },
  {
    user: mongoose.Types.ObjectId.createFromHexString(
      '64a02850c21039353808b262'
    ),
    taskTag: mongoose.Types.ObjectId.createFromHexString(
      '64a0163810f4179aa8f4c7b3'
    ),
    text: 'Aliquip Lorem laboris et anim ipsum tempor. Proident ex non cillum nisi nisi tempor velit nulla reprehenderit sit sint quis. Nisi eu deserunt aliquip ea sunt mollit. Proident cupidatat sint ad esse eu voluptate. Ut dolor proident nulla proident duis. Proident ea laboris deserunt quis. Aliquip cupidatat cillum velit irure.',
    candidate: [
      {
        user: mongoose.Types.ObjectId.createFromHexString(
          '64b25c28e5533a086228f4e7'
        ),
        text: 'abc',
        price: 100,
      },
      {
        user: mongoose.Types.ObjectId.createFromHexString(
          '64b253f56dc6525e4693f475'
        ),
        text: 'a1111bc',
        price: 2,
      },
    ],
  },
  {
    user: mongoose.Types.ObjectId.createFromHexString(
      '64a02850c21039353808b262'
    ),
    taskTag: mongoose.Types.ObjectId.createFromHexString(
      '64a0163810f4179aa8f4c7b3'
    ),
    text: 'Aliquip Lorem laboris et anim ipsum tempor. Proident ex non cillum nisi nisi tempor velit nulla reprehenderit sit sint quis. Nisi eu deserunt aliquip ea sunt mollit. Proident cupidatat sint ad esse eu voluptate. Ut dolor proident nulla proident duis. Proident ea laboris deserunt quis. Aliquip cupidatat cillum velit irure.',
    candidate: [
      {
        user: mongoose.Types.ObjectId.createFromHexString(
          '64b25c28e5533a086228f4e7'
        ),
        text: 'abc',
        price: 100,
      },
      {
        user: mongoose.Types.ObjectId.createFromHexString(
          '64b253f56dc6525e4693f475'
        ),
        text: 'a1111bc',
        price: 2,
      },
    ],
  },
  {
    user: mongoose.Types.ObjectId.createFromHexString(
      '64a02850c21039353808b262'
    ),
    taskTag: mongoose.Types.ObjectId.createFromHexString(
      '64a0163810f4179aa8f4c7b3'
    ),
    text: 'Aliquip Lorem laboris et anim ipsum tempor. Proident ex non cillum nisi nisi tempor velit nulla reprehenderit sit sint quis. Nisi eu deserunt aliquip ea sunt mollit. Proident cupidatat sint ad esse eu voluptate. Ut dolor proident nulla proident duis. Proident ea laboris deserunt quis. Aliquip cupidatat cillum velit irure.',
    candidate: [
      {
        user: mongoose.Types.ObjectId.createFromHexString(
          '64b25c28e5533a086228f4e7'
        ),
        text: 'abc',
        price: 100,
      },
      {
        user: mongoose.Types.ObjectId.createFromHexString(
          '64b253f56dc6525e4693f475'
        ),
        text: 'a1111bc',
        price: 2,
      },
    ],
  },
  {
    user: mongoose.Types.ObjectId.createFromHexString(
      '64a02850c21039353808b262'
    ),
    taskTag: mongoose.Types.ObjectId.createFromHexString(
      '64a0163810f4179aa8f4c7b3'
    ),
    text: 'Aliquip Lorem laboris et anim ipsum tempor. Proident ex non cillum nisi nisi tempor velit nulla reprehenderit sit sint quis. Nisi eu deserunt aliquip ea sunt mollit. Proident cupidatat sint ad esse eu voluptate. Ut dolor proident nulla proident duis. Proident ea laboris deserunt quis. Aliquip cupidatat cillum velit irure.',
    candidate: [
      {
        user: mongoose.Types.ObjectId.createFromHexString(
          '64b25c28e5533a086228f4e7'
        ),
        text: 'abc',
        price: 100,
      },
      {
        user: mongoose.Types.ObjectId.createFromHexString(
          '64b253f56dc6525e4693f475'
        ),
        text: 'a1111bc',
        price: 2,
      },
    ],
  },
];

module.exports = posts;
