import {  MoreHoriz } from "@mui/icons-material";
import { Avatar, Box, CardContent, IconButton, Typography } from "@mui/joy";

type HeaderProps = { 
    author: User
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
            background:'#CCC',
          },
        }}
      >
        <Avatar
          size="sm"
          src=""
          sx={{ p: 0.5, border: '2px solid', borderColor: 'background.body' }}
        />
      </Box>
      <Typography fontWeight="lg">{author.userName}</Typography>
      <IconButton variant="plain" color="neutral" size="sm" sx={{ ml: 'auto' }}>
        <MoreHoriz />
      </IconButton>
    </CardContent>
  );
  

  
  export default Header; 