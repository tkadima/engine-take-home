import {Card, CardActions, CardContent, CardMedia, Typography, IconButton, IconButtonProps } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

type ContentProps = {
    imageUri: string, 
    textData: TextData, 
    comments: Comment[]
}
const ContentCard = ({imageUri, textData}: ContentProps) => {

    return (<Card sx={{ width: 345, margin: '10px'}}>
        <CardMedia
            image={imageUri}
            title={textData.title}
            sx={{ height: 140 }}
        />
        <CardContent>
            <Typography variant='body1'>
            {textData.title}
            </Typography>
        </CardContent>
        <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>)
 }

export default ContentCard;