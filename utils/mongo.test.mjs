import { cleanAndNormalizeData } from './mongo.mjs';

describe('cleanAndNormalizeData', () => {
  it('should throw an error if id is missing', () => {
    const data = [{}];
    expect(() => cleanAndNormalizeData(data)).toThrow('Missing required field: id');
  });

  it('should set default imageUri if missing or invalid', () => {
    const dataMissingUri = [{ id: '123' }];
    const resultMissing = cleanAndNormalizeData(dataMissingUri);
    expect(resultMissing[0].imageUri).toBe('https://picsum.photos/500/500');

    const dataInvalidImageUri = [{ id: '123' }];
    const resultInvalid = cleanAndNormalizeData(dataInvalidImageUri);
    expect(resultInvalid[0].imageUri).toBe('https://picsum.photos/500/500');

  });

  it('should trim fields correctly', () => {
    const data = [
      {
        id: ' 123 ',
        imageUri: ' https://picsum.photos/500/500 ',
        textData: {
          title: ' Title ',
          subTitle: ' Subtitle ',
          body: ' Body ',
          author: { first: ' First ', last: ' Last ' }
        },
        metadata: {
          publishDate: '2021-01-01',
          priority: 1
        },
        comments: [
          {
            author: ' Comment Author ',
            likes: 10,
            profilePic: ' Profile Pic ',
            text: ' Comment Text '
          }
        ]
      }
    ];
    const result = cleanAndNormalizeData(data);
    expect(result[0].id).toBe('123');
    expect(result[0].imageUri).toBe('https://picsum.photos/500/500');
    expect(result[0].textData.title).toBe('Title');
    expect(result[0].textData.subTitle).toBe('Subtitle');
    expect(result[0].textData.body).toBe('Body');
    expect(result[0].textData.author.first).toBe('First');
    expect(result[0].textData.author.last).toBe('Last');
    expect(result[0].metadata.publishDate).toEqual(new Date('2021-01-01'));
    expect(result[0].metadata.priority).toBe(1);
    expect(result[0].comments[0].author).toBe('Comment Author');
    expect(result[0].comments[0].profilePic).toBe('Profile Pic');
    expect(result[0].comments[0].text).toBe('Comment Text');
  });
});
