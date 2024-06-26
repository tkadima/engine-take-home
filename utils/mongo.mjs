import { MongoClient } from 'mongodb';

const uri = 'mongodb://mongo:27017/instagram-replica';

let cachedClient;

export async function connectToDatabase() {
    if (cachedClient && cachedClient.topology && cachedClient.topology.isConnected()) {
        return cachedClient;
    }

    try {
        const client = new MongoClient(uri);
        await client.connect();
        cachedClient = client;
        return client;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

// export function cleanAndNormalizeData(data) {
//     const imageUriPattern = /^https:\/\/picsum\.photos\/[1-5]00\/[1-5]00$/; // remove no longer true

//     return data.map(item => {
//         // Ensure id field is present
//         if (!item.id) {
//             throw new Error('Missing required field: id');
//         }

//         // Set default value for imageUri if missing
//         if (!item.imageUri || !imageUriPattern.test(item.imageUri)) {
//             item.imageUri = 'https://picsum.photos/500/500';
//         }

//         return {
//             id: item.id.trim(),
//             imageUri: item.imageUri.trim(),
//             textData: {
//                 title: item.textData?.title?.trim() || '',
//                 subTitle: item.textData?.subTitle?.trim() || '',
//                 body: item.textData?.body?.trim() || '',
//                 author: {
//                     first: item.textData?.author?.first?.trim() || '',
//                     last: item.textData?.author?.last?.trim() || ''
//                 }
//             },
//             metadata: {
//                 publishDate: item.metadata?.publishDate ? new Date(item.metadata.publishDate) : null,
//                 priority: item.metadata?.priority || 0
//             },
//             comments: item.comments?.map(comment => ({
//                 author: comment.author?.trim() || '',
//                 likes: comment.likes || 0,
//                 profilePic: comment.profilePic?.trim() || '',
//                 text: comment.text?.trim() || ''
//             })) || []
//         };
//     });
// }

export async function dropDatabase() {
    try {
        const client = await connectToDatabase();
        const db = client.db('instagram-replica-db');
        await db.dropDatabase();
        console.log('Database dropped successfully.');
    } catch (error) {
        console.error('Error dropping database:', error);
        throw error;
    }
}

export async function seedDatabase(data) {
    try {
        await dropDatabase();
        const client = await connectToDatabase();
        const db = client.db('instagram-replica-db');
        const collection = db.collection('posts');
       // const cleanData = cleanAndNormalizeData(data); 
        const result = await collection.insertMany(data);
        console.log(`${result.insertedCount} documents inserted into the database.`);
        return result;
    } catch (error) {
        console.error('Error seeding database:', error);
        throw error;
    }
}
