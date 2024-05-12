import { FavoriteBorder } from "@mui/icons-material";
import { Avatar, Box, DialogContent, DialogTitle, Divider, IconButton, List, ListDivider, ListItem, 
    ListItemDecorator, Modal, ModalDialog, Stack, Typography } from "@mui/joy"


type CommentProps = {
    comment: Comment; 
} 
const Comment = ({comment}: CommentProps) =>(
    <>
        <ListItem>
                <Stack direction="row" spacing={3}>
                    <Stack direction="row" spacing={1}>
                        <ListItemDecorator>
                            <Avatar size="sm" src={comment.profilePic} />
                        </ListItemDecorator>
                        <Typography  color="neutral" fontSize="sm" fontWeight="xl">{comment.author} </Typography>
                    </Stack>
                    <Stack>
                        {comment.text}
                    </Stack>
                    <Stack direction="row" spacing={1} alignSelf="end">
                        <IconButton variant="plain" color="neutral" size="sm" >
                            <FavoriteBorder />
                        </IconButton>
                        <Typography fontSize="xs">{comment.likes}</Typography>
                    </Stack>
                </Stack>
       
        </ListItem>
        <ListDivider inset="startDecorator" />
    </>
)
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
            <DialogContent>
                <List>
                    {
                        comments.map(comment => <Comment comment={comment}/>)
                    } 
                </List>
            </DialogContent>
        </ModalDialog>
    </Modal>
)
export default ContentModal; 