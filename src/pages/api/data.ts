import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const data = {
        contentCards: [
            // api data 
        ]
    };

    res.status(200).json(data);
}
