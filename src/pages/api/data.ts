import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../utils/mongo.mjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await connectToDatabase();
    const db = client.db('engine');
    const collection = db.collection('content');

    if(req.method === 'POST') { 

    }
    if(req.method === 'GET') {
        res.status(200).json(collection.data); 
    }


}
