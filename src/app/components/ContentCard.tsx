import { Card, CardContent, IconButton, Box, Link, Avatar, CardOverflow, Input, AspectRatio, Typography } from '@mui/joy';
import { BookmarkBorderRounded, Face, FavoriteBorder, ModeCommentOutlined, MoreHoriz, SendOutlined } from '@mui/icons-material';
import { useState } from 'react';
import styles from '../../styles.module.css';

const maxBodySize = 200;

type HeaderProps = { 
  author: Author
}

const Header = ({ author }: HeaderProps) => (
  <CardContent orientation="horizontal" sx={{ alignItems: 'center', gap: 1 }}>
    <Box
      sx={{
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          m: '-2px',
          borderRadius: '50%',
          background:
            'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
        },
      }}
    >
      <Avatar
        size="sm"
        src="/static/logo.png"
        sx={{ p: 0.5, border: '2px solid', borderColor: 'background.body' }}
      />
    </Box>
    <Typography fontWeight="lg">{author.first} {author.last}</Typography>
    <IconButton variant="plain" color="neutral" size="sm" sx={{ ml: 'auto' }}>
      <MoreHoriz />
    </IconButton>
  </CardContent>
);

const Footer = () => (
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

type ContentProps = { 
  textData: TextData; 
  isExpanded: boolean; 
  setIsExpanded: (expanded: boolean) => void;
  priority: number, 
  timeLapsed: string,
}

const Content = ({ textData, isExpanded, setIsExpanded, priority, timeLapsed }: ContentProps) => (
  <CardContent>
    <Link
      component="button"
      underline="none"
      fontSize="sm"
      fontWeight="lg"
      textColor="text.primary"
    >
      {priority} likes
    </Link>
    <Typography fontSize="sm" className={styles.contentCard_description}>
      <Link
        component="button"
        color="neutral"
        fontWeight="lg"
        textColor="text.primary"
      >
        {textData.subTitle}
      </Link>{' '}
      {isExpanded ? textData.body : textData.body.slice(0, maxBodySize)}
      <Link
      component="button"
      underline="none"
      fontSize="sm"
      startDecorator="…"
      sx={{ color: 'text.tertiary' }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {isExpanded ? 'less' : 'more'}
    </Link>
    </Typography>
 
    <Link
      component="button"
      underline="none"
      fontSize="10px"
      sx={{ color: 'text.tertiary', my: 0.5 }}
    >
      {timeLapsed}
    </Link>
  </CardContent>
);

const CommentSection = () => (
  <CardContent orientation="horizontal" sx={{ gap: 1 }}>
    <IconButton size="sm" variant="plain" color="neutral" sx={{ ml: -1 }}>
      <Face />
    </IconButton>
    <Input
      variant="plain"
      size="sm"
      placeholder="Add a comment…"
      sx={{ flex: 1, px: 0, '--Input-focusedThickness': '0px' }}
    />
    <Link disabled underline="none" role="button">
      Post
    </Link>
  </CardContent>
);

type ContentCardProps = {
  imageUri: string, 
  textData: TextData, 
  comments: Comment[],
  priority: number,
  publishDate: string
}

const ContentCard = ({ imageUri, textData, priority, publishDate }: ContentCardProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  function timeAgo(dateString: string): string {
    const today = new Date();
    const date = new Date(dateString); 
    const years = today.getFullYear() - date.getFullYear();
    const months = today.getMonth() - date.getMonth(); 
    const days = today.getDay() - date.getDay()
    // I would continue with hours, and minutes but it's unnecessary given the data
    // I would add the smaller denominations if I needed to enable creating posts
    if (years >= 1) { 
      return `${years} years ago`;
    }
    if (months < 12) { 
      return `${months} months ago`;
    }
    return `${days} days ago`; 
  }

  return (
    <Card
      variant="outlined"
      sx={{
        width: 600,
        '--Card-radius': (theme) => theme.vars.radius.xs,
        marginBottom: '20px'
      }}
    >
      <Header author={textData.author} />
      <CardOverflow>
        <AspectRatio>
          <img src={imageUri} alt={textData.title} loading="lazy" />
        </AspectRatio>
      </CardOverflow>
      <Footer />
      <Content 
        textData={textData} 
        isExpanded={isExpanded} 
        setIsExpanded={setIsExpanded} 
        priority={priority} 
        timeLapsed={timeAgo(publishDate)} />
      <CommentSection />
    </Card>
  );
};

export default ContentCard;
