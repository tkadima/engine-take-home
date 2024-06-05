import axios from 'axios';
import { seedDatabase, connectToDatabase } from '../utils/mongo.mjs';

export async function fetchDataAndSeedDatabase() {
    let client;
    try {
        const response = await axios.get('https://stoplight.io/mocks/engine/fullstack-spec/52502230/content', {
            headers: {
                Accept: 'application/json',
                Prefer: 'code=200'
            }
        });

        const data = response.data.contentCards;
        client = await connectToDatabase();
        await seedDatabase(data);
        await createIndex();
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
