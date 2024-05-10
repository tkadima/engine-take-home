import axios from 'axios';
import { seedDatabase } from './mongo.mjs';

export async function fetchDataAndSeedDatabase() {
    console.log('gonna fetch and seed the data')
    try {
        const response = await axios.get('https://stoplight.io/mocks/engine/fullstack-spec/52502230/content', {
            headers: {
                Accept: 'application/json',
                Prefer: 'code=200, dynamic=true'
            }
        });
        console.log('response in fetch seed func', response.data); 
        
        const data = response.data.contentCards;

        await seedDatabase(data);
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}

await fetchDataAndSeedDatabase()
