import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../utils/mongo.mjs';
import { getPaginationParams } from '../../utils/pagination';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await connectToDatabase();
    const db = client.db('instagram-replica-db');
    const collection = db.collection('posts');
    
    if (req.method === 'GET') {
        const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;

        const itemsPerPage = req.query.limit ? parseInt(req.query.limit as string, 10) : 20;

        const {startIndex, limit} = getPaginationParams(page, itemsPerPage);

        try {
            const totalRecords = await collection.countDocuments();
            const totalPages = Math.ceil(totalRecords / itemsPerPage);
            
            const posts = await collection
                .find()
                .skip(startIndex)
                .limit(limit)
                .toArray();
            
            res.status(200).json({ posts, totalPages });
        } catch (error) {
            console.error('Error retrieving documents:', error);
            res.status(500).json({ error: 'Internal Server Error', details: error });
        }
    }    
    
}
