import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { NextApiRequest, NextApiResponse } from 'next';
import handler from './data';
import { connectToDatabase } from '../../../utils/mongo.mjs';
import { sampleContent, testCases } from './data-test-helper ';

jest.mock('../../../utils/mongo.mjs', () => ({
  connectToDatabase: jest.fn(),
}));

describe('/api/data endpoint', () => {
  let mongoServer: MongoMemoryServer;
  let mongoClient: MongoClient;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    mongoClient = new MongoClient(mongoUri);
    await mongoClient.connect();
    (connectToDatabase as jest.Mock).mockResolvedValue(mongoClient);
  });

  afterAll(async () => {
    await mongoClient.close();
    await mongoServer.stop();
  });

  it('should return content and total pages', async () => {
    const db = mongoClient.db('engine');
    const collection = db.collection('content'); 
    
    await collection.insertMany(sampleContent)


    for (const { page, limit, expectedContentLength, expectedTotalPages } of testCases) {

      const req = { method: 'GET', query: { page, limit } } as any as NextApiRequest;
      
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn()} as any as NextApiResponse;

      await handler(req, res);
      
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ 
          content: expect.any(Array), 
          totalPages: expect.any(Number) 
        })
      );

      const { content, totalPages } = (res.json as jest.Mock).mock.calls[0][0];
      expect(content.length).toBe(expectedContentLength);
      expect(totalPages).toBe(expectedTotalPages);
    }

  });
});
