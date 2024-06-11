import { CardContent, Link, Typography } from "@mui/joy";
import styles from '../../styles.module.css';

const maxBodySize = 200;

type ContentProps = { 
    authorUserName: string; 
    caption: string;
    numberOfLikes: number;
    isExpanded: boolean; 
    setIsExpanded: (expanded: boolean) => void;
    timeLapsed: string,
  }
  
  const Content = ({ authorUserName, caption, isExpanded, setIsExpanded, numberOfLikes, timeLapsed }: ContentProps) => (
    <CardContent>
      <Link
        component="button"
        underline="none"
        fontSize="sm"
        fontWeight="lg"
        textColor="text.primary"
      >
        {numberOfLikes} likes
      </Link>
      <Typography fontSize="sm" className={styles.contentCard_description}>
        <Link
          component="button"
          color="neutral"
          fontWeight="lg"
          textColor="text.primary"
        >
          {authorUserName}
        </Link>
        <Typography className={styles.content_card_body}>
        {isExpanded ? caption : caption.slice(0, maxBodySize)}
        </Typography>
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
  
  export default Content;