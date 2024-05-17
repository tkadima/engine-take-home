import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017';

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

export function cleanAndNormalizeData(data) {
    const imageUriPattern = /^https:\/\/picsum\.photos\/[1-5]00\/[1-5]00$/;

    return data.map(item => {
        // Ensure id field is present
        if (!item.id) {
            throw new Error('Missing required field: id');
        }

        // Set default value for imageUri if missing
        if (!item.imageUri || !imageUriPattern.test(item.imageUri)) {
            item.imageUri = 'https://picsum.photos/500/500';
        }

        return {
            id: item.id.trim(),
            imageUri: item.imageUri.trim(),
            textData: {
                title: item.textData?.title?.trim() || '',
                subTitle: item.textData?.subTitle?.trim() || '',
                body: item.textData?.body?.trim() || '',
                author: {
                    first: item.textData?.author?.first?.trim() || '',
                    last: item.textData?.author?.last?.trim() || ''
                }
            },
            metadata: {
                publishDate: item.metadata?.publishDate ? new Date(item.metadata.publishDate) : null,
                priority: item.metadata?.priority || 0
            },
            comments: item.comments?.map(comment => ({
                author: comment.author?.trim() || '',
                likes: comment.likes || 0,
                profilePic: comment.profilePic?.trim() || '',
                text: comment.text?.trim() || ''
            })) || []
        };
    });
}


export async function seedDatabase(data) {
    try {
        const client = await connectToDatabase();
        const db = client.db('engine');
        const collection = db.collection('content');
        const cleanData = cleanAndNormalizeData(data); 
        const result = await collection.insertMany(cleanData);
        console.log(`${result.insertedCount} documents inserted into the database.`);
        return result;
    } catch (error) {
        console.error('Error seeding database:', error);
        throw error;
    }
}
