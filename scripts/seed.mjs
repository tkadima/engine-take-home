import axios from 'axios';
import { seedDatabase, connectToDatabase } from '../utils/mongo.mjs';


const cards = [{
    "id": "post1",
    "imageUri": "https://example.com/image1.jpg",
    "comments": [
      {
        "id": 1,
        "author": {
          "id": 101,
          "userName": "user1",
          "profilePicUrl": "https://example.com/profile1.jpg"
        },
        "likes": 5,
        "profilePic": "https://example.com/profile1.jpg",
        "text": "Great post!",
        "replies": [
          {
            "id": 2,
            "author": {
              "id": 102,
              "userName": "user2",
              "profilePicUrl": "https://example.com/profile2.jpg"
            },
            "likes": 2,
            "profilePic": "https://example.com/profile2.jpg",
            "text": "I agree!",
            "replies": [],
            "publishDate": "2023-06-10T12:00:00Z"
          }
        ],
        "publishDate": "2023-06-10T11:00:00Z"
      },
      {
        "id": 3,
        "author": {
          "id": 103,
          "userName": "user3",
          "profilePicUrl": "https://example.com/profile3.jpg"
        },
        "likes": 3,
        "profilePic": "https://example.com/profile3.jpg",
        "text": "Nice picture!",
        "replies": [],
        "publishDate": "2023-06-10T12:30:00Z"
      }
    ],
    "publishDate": "2023-06-10T10:00:00Z",
    "author": {
      "id": 100,
      "userName": "author1",
      "profilePicUrl": "https://example.com/author1.jpg"
    },
    "caption": "A beautiful view!",
    "numberOfLikes": 100
  }];
  
export async function fetchDataAndSeedDatabase() {
    let client;
    try {
        // const response = await axios.get('https://stoplight.io/mocks/engine/fullstack-spec/52502230/content', {
        //     headers: {
        //         Accept: 'application/json',
        //         Prefer: 'code=200'
        //     }
        // });

        //const data = response.data.contentCards;
        const data = cards; 
        client = await connectToDatabase();
        await seedDatabase(data);
       // await createIndex();
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    } finally {
        if (client) {
            await client.close();
        }
        process.exit(0);
    }
}

async function createIndex() {
    try {
        const client = await connectToDatabase();
        const db = client.db('instagram-replica-db')
        const collection = db.collection('content');
         await collection.createIndex({ 'metadata.priority': 1 });
        console.log('Index created on metadata.priority');
    } catch (error) {
        console.error('Error creating index:', error);
        throw error;
    }
}

await fetchDataAndSeedDatabase();
