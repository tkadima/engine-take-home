export const sampleContent = [
    {
        id: 1, 
        imageUrl: 'example.jpeg'
      }, 
      {
        id: 2, 
        imageUrl: 'example.jpeg'
      }, 
      {
        id: 3, 
        imageUrl: 'example.jpeg'
      }, 
      {
        id: 4, 
        imageUrl: 'example.jpeg'
      },
      {
        id: 5, 
        imageUrl: 'example.jpeg'
      }, 
      {
        id: 6, 
        imageUrl: 'example.jpeg'
      }, 
      {
        id: 7, 
        imageUrl: 'example.jpeg'
      }, 
      {
        id: 8, 
        imageUrl: 'example.jpeg'
      },
      {
        id: 9, 
        imageUrl: 'example.jpeg'
      }, 
      {
        id: 10, 
        imageUrl: 'example.jpeg'
      }, 
      {
        id: 11, 
        imageUrl: 'example.jpeg'
      }, 
      {
        id: 12, 
        imageUrl: 'example.jpeg'
      },
      {
        id: 13, 
        imageUrl: 'example.jpeg'
      }, 
      {
        id: 14, 
        imageUrl: 'example.jpeg'
      }, 
      {
        id: 15, 
        imageUrl: 'example.jpeg'
      }, 
      {
        id: 16, 
        imageUrl: 'example.jpeg'
      },
      {
        id: 17, 
        imageUrl: 'example.jpeg'
      }, 
      {
        id: 18, 
        imageUrl: 'example.jpeg'
      }, 
      {
        id: 19, 
        imageUrl: 'example.jpeg'
      }, 
      {
        id: 20, 
        imageUrl: 'example.jpeg'
      }
]

export type TestCase = {
    page?: number, 
    limit?: number, 
    expectedContentLength: number, 
    expectedTotalPages: number
  }

  export const testCases: TestCase[] = [
    { page: 1, limit: 2, expectedContentLength: 2, expectedTotalPages: 10 },
    { page: 2, limit: 2, expectedContentLength: 2, expectedTotalPages: 10 },
    { expectedContentLength: 20, expectedTotalPages: 1 }
  ];