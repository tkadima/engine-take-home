import { Card, CardContent, Link, CardOverflow, AspectRatio, IconButton, Box } from '@mui/joy';
import { useState } from 'react';
import ContentModal from '../ContentModal';
import Image from 'next/image';
import CommentInput from './CommentInput';
import Content from './Content';
import Header from './Header';
import { BookmarkBorderRounded, FavoriteBorder, ModeCommentOutlined, SendOutlined } from '@mui/icons-material';


type ContentCardProps = {
  cardData: Post
}

const ContentCard = ({ cardData }: ContentCardProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<string|null>(null); 
  const [modalOpen, setModalOpen] = useState<boolean>(false); 

  const { author, caption, comments, imageUri, numberOfLikes, publishDate } = cardData; 

  const  timeAgo = (date: Date): string  => {
    const today = new Date();
    const years = today.getFullYear() - date.getFullYear();
    const months = today.getMonth() - date.getMonth(); 
    const days = today.getDay() - date.getDay();

    if (years >= 1) { 
      return `${years} years ago`;
    }
    if (months < 12) { 
      return `${months} months ago`;
    }
    return `${days} days ago`; 
  };

  const [, widthStr, heightStr] = imageUri.match(/\/(\d+)\/(\d+)/) || [];
  const width = parseInt(widthStr, 10);
  const height = parseInt(heightStr, 10);

  const Actions = () => (
    <CardContent orientation="horizontal" sx={{ alignItems: 'center', mx: -1 }}>
      <Box sx={{ width: 0, display: 'flex', gap: 0.5 }}>
        <IconButton variant="plain" color="neutral" size="sm">
          <FavoriteBorder />
        </IconButton>
        <IconButton variant="plain" color="neutral" size="sm">
          <ModeCommentOutlined />
        </IconButton>
        <IconButton variant="plain" color="neutral" size="sm">
          <SendOutlined />
        </IconButton>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mx: 'auto' }}></Box>
      <Box sx={{ width: 0, display: 'flex', flexDirection: 'row-reverse' }}>
        <IconButton variant="plain" color="neutral" size="sm">
          <BookmarkBorderRounded />
        </IconButton>
      </Box>
    </CardContent>
  );

  return (
    <Card
      variant="outlined"
      sx={{
        maxWidth: '500px',
        '--Card-radius': (theme) => theme.vars.radius.xs,
        marginBottom: '20px'
      }}
    >
      <Header author={author} />
      <CardOverflow>
        <AspectRatio>
          <Image src={author.profilePicUrl} alt={author.userName} loading="lazy" width={width} height={height}/>
        </AspectRatio>
        </CardOverflow>
      <Actions />
      <Content 
        authorUserName={author.userName}
        caption={caption}
        numberOfLikes={numberOfLikes}
        isExpanded={isExpanded} 
        setIsExpanded={setIsExpanded} 
        timeLapsed={timeAgo(publishDate)} />
        <CardContent orientation="horizontal" sx={{ gap: 1 }}>
            <Link color="neutral" onClick={() => setModalOpen(true)}>
              {comments.length === 1 ? `View Comment` :`View all ${comments.length} comments`}
            </Link>
          </CardContent>
          <ContentModal isOpen={modalOpen} setIsOpen={setModalOpen} comments={comments} author={author}/>
      <CommentInput newComment={newComment} setNewComment={setNewComment}/>
    </Card>
  );
};

export default ContentCard;
