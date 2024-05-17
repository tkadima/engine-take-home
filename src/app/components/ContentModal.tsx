import { FavoriteBorder } from "@mui/icons-material";
import { Avatar, DialogContent, DialogTitle, Divider, IconButton, List, ListDivider, ListItem, 
     Modal, ModalDialog, Stack, Typography } from "@mui/joy"
import { Grid } from "@mui/material";
import  styles  from '../../styles.module.css'; 

type CommentProps = {
    comment: Comment; 
} 
const Comment = ({ comment }: CommentProps) => (
    <ListItem>
        <Grid container alignItems="center">
            <Grid item xs="auto">
                <Avatar size="sm" src={comment.profilePic} />
            </Grid>
            <Grid item xs="auto" style={{ marginLeft: 10 }}>
                <Typography color="neutral" fontSize="sm" fontWeight="xl">{comment.author}</Typography>
            </Grid>
            <Grid item xs style={{ marginLeft: 20 }}>
                <Typography>{comment.text}</Typography>
            </Grid>
            <Grid item xs="auto" style={{ marginLeft: 10 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                    <IconButton variant="plain" color="neutral" size="sm">
                        <FavoriteBorder />
                    </IconButton>
                    <Typography fontSize="xs">{comment.likes}</Typography>
                </Stack>
            </Grid>
        </Grid>
        <ListDivider inset="startDecorator" />
    </ListItem>
);

type ContentModalProps = {
    comments: Comment[],
    isOpen: boolean,
    setIsOpen: (open: boolean) => void,
    author: Author
    
}

const ContentModal = ({comments, isOpen, setIsOpen} : ContentModalProps) => (
     <Modal 
        open={isOpen} 
        onClose={() => setIsOpen(false)} 
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <ModalDialog>
            <DialogTitle>Comments</DialogTitle>
            <Divider inset="none" />
            <DialogContent className={styles.modalDialog}>
                <List>
                    {
                        comments.map(comment => <Comment key={comment.text} comment={comment}/>)
                    } 
                </List>
            </DialogContent>
        </ModalDialog>
    </Modal>
)
export default ContentModal; 