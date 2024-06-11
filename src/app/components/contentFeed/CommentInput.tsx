import { Face } from "@mui/icons-material";
import { CardContent, IconButton, Input, Link } from "@mui/joy";

type CommentProps = {
    newComment: string | null,
    setNewComment: (comment: string) => void
  }
  const CommentInput = ({newComment, setNewComment}: CommentProps) => (
    <CardContent orientation="horizontal" sx={{ gap: 1 }}>
      <IconButton size="sm" variant="plain" color="neutral" sx={{ ml: -1 }}>
        <Face />
      </IconButton>
      <Input
        variant="plain"
        size="sm"
        placeholder="Add a comment…"
        sx={{ flex: 1, px: 0, '--Input-focusedThickness': '0px' }}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <Link disabled={!newComment} underline="none" role="button">
        Post
      </Link>
    </CardContent>
  );
  export default CommentInput; 