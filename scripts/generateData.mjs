import faker from 'faker'; 

const generateUser = (id) => ({
    id,
    userName: faker.internet.userName(),
    profilePicUrl: faker.image.avatar(),
  });
  
  const generateComment = (id, userId) => ({
    id,
    author: generateUser(userId),
    likes: faker.datatype.number({ min: 0, max: 100 }),
    profilePic: faker.image.avatar(),
    text: faker.lorem.sentence(),
    replies: [],
    publishDate: faker.date.past(),
  });
  
  const generatePost = (id) => {
    const comments = [];
    for (let i = 0; i < faker.datatype.number({ min: 0, max: 10 }); i++) {
      comments.push(generateComment(faker.datatype.number(), faker.datatype.number()));
    }
    return {
      id,
      imageUri: faker.image.imageUrl(),
      comments,
      publishDate: faker.date.past(),
      author: generateUser(faker.datatype.number()),
      caption: faker.lorem.sentence(),
      numberOfLikes: faker.datatype.number({ min: 0, max: 1000 }),
    };
  };
  
  export const generateData = (numPosts) => {
    const data = [];
    for (let i = 0; i < numPosts; i++) {
      data.push(generatePost(faker.datatype.uuid()));
    }
    return data;
  };