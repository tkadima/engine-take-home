import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017';

let cachedClient;

export async function connectToDatabase() {
    if (cachedClient) return cachedClient;

    const client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    cachedClient = client;
    return client;
}

export async function seedDatabase(data) {
    try {
        const client = await connectToDatabase();
        const db = client.db('engine');
        const collection = db.collection('content');

        const result = await collection.insertMany(data);

        console.log(`${result.insertedCount} documents inserted into the database.`);
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}
