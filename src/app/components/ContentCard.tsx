import {Card, CardActions, CardContent, CardMedia, Typography, IconButton, Collapse } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { ExpandMore } from '@mui/icons-material';
import { useState } from 'react';


type ContentProps = {
    imageUri: string, 
    textData: TextData, 
    comments: Comment[]
}
const ContentCard = ({imageUri, textData}: ContentProps) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false); 

    return (<Card sx={{ width: 345, margin: '10px'}}>
        <CardMedia
            image={imageUri}
            title={textData.title}
            sx={{ height: 180 }}
        />
        <CardContent>
            <Typography variant='body1'>
            {textData.title}
            </Typography>
        </CardContent>
        <CardActions disableSpacing>
        <IconButton>
          <FavoriteIcon />
        </IconButton>
        <IconButton>
          <ShareIcon />
        </IconButton>
        <IconButton style={{marginLeft: 'auto',   transform: !isExpanded ? 'rotate(0deg)' : 'rotate(180deg)'}} onClick={() => setIsExpanded(!isExpanded)}>
            <ExpandMore />
        </IconButton>
      </CardActions>
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <CardContent>
            <Typography paragraph> {textData.title}</Typography>
            <Typography paragraph> {textData.subTitle}</Typography>
            <Typography paragraph> {textData.author.first} {textData.author.last}</Typography>
        </CardContent>
      </Collapse>
    </Card>)
 }

export default ContentCard;