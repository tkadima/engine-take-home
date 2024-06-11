interface User {
    id: number;
    userName: string; 
    profilePicUrl: string; 
}


interface Comment {
    id: number; 
    author: User;
    likes: number;
    profilePic: string;
    text: string;
    replies: Comment[];
    publishDate: Date; 
}


interface Post {
    id: string;
    imageUri: string;
    comments: Comment[];
    publishDate: Date; 
    author: User;
    caption: string;
    numberOfLikes: number;
}
