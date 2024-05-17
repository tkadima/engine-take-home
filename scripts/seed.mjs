import axios from 'axios';
import { seedDatabase } from '../utils/mongo.mjs';

export async function fetchDataAndSeedDatabase() {
    try {
        const response = await axios.get('https://stoplight.io/mocks/engine/fullstack-spec/52502230/content', {
            headers: {
                Accept: 'application/json',
                Prefer: 'code=200, dynamic=true'
            }
        });
        
        const data = response.data.contentCards;

        await seedDatabase(data);
        process.exit(0);

    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

await fetchDataAndSeedDatabase()
