import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../utils/mongo.mjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await connectToDatabase();
    const db = client.db('engine');
    const collection = db.collection('content');
    if(req.method === 'POST') { 

    }
    if (req.method === 'GET') {
        const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
        const itemsPerPage = req.query.limit ? parseInt(req.query.limit as string, 10) : 20;
        const startIndex = (page - 1) * itemsPerPage;
    
        try {
            const totalRecords = await collection.countDocuments();
            const totalPages = Math.ceil(totalRecords / itemsPerPage);
            
            const content = await collection
                .find()
                .sort({ 'metadata.priority': -1 })
                .skip(startIndex)
                .limit(itemsPerPage)
                .toArray();
            
            res.status(200).json({ content, totalPages });
        } catch (error) {
            console.error('Error retrieving documents:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }    
    
}
