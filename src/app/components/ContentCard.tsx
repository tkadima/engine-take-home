import {Card, CardContent, CardMedia, Typography } from '@mui/material';

type ContentProps = {
    imageUri: string, 
    textData: TextData, 
    comments: Comment[]
}
const ContentCard = ({imageUri, textData, comments}: ContentProps) => {

    return (<Card>
        <CardMedia
            image={imageUri}
            title={textData.title}
        />
        <CardContent>
            <Typography variant='h5' component="div">
            {textData.title}
            </Typography>
            <Typography variant='h5' component="div">
            {textData.subTitle}
            </Typography>
            <Typography variant='h5' component="div">
            {textData.author.first} {textData.author.last}
            </Typography>
            <div>
                <ul>
                    {comments.map(comment => {
                        return <li key={comment.text}>{comment.text}</li>
                    })}
                </ul>
            </div>

        </CardContent>
    </Card>)
 }

export default ContentCard;