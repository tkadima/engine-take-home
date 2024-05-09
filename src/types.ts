interface Author {
    first: string;
    last: string;
}

interface TextData {
    author: Author;
    subTitle: string;
    title: string;
    body: string;
}

interface Comment {
    author: string;
    likes: number;
    profilePic: string;
    text: string;
}

interface Metadata {
    publishDate: string;
    priority: number;
}
interface ContentCard {
    id: string;
    imageUri: string;
    textData: TextData;
    metadata: Metadata;
    comments: Comment[];
}
