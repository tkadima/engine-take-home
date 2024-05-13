import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { NextApiRequest, NextApiResponse } from 'next';
import handler from './data';
import { connectToDatabase } from '../../../utils/mongo.mjs';

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
    const req = {} as NextApiRequest;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as NextApiResponse;

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ content: expect.any(Array), totalPages: expect.any(Number) }));
  });

});
