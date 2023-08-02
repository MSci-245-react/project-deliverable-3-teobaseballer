import React from 'react';
import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';

import { AppBar, Toolbar } from '@mui/material';

const ReviewPage = () => {
    const navigate = useNavigate();

    const handleLinkClick = (path) => {
      navigate(path);
    };

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Link color="inherit" style={{ textDecoration: 'none', marginRight: 15, cursor: "pointer" }} onClick={() => handleLinkClick('/')}>
              <Typography variant="h6" color="inherit" noWrap>
                Landing
              </Typography>
            </Link>
            <Link color="inherit" style={{ textDecoration: 'none', marginRight: 15, cursor: "pointer" }} onClick={() => handleLinkClick('/search')}>
              <Typography variant="h6" color="inherit" noWrap>
                Search
              </Typography>
            </Link>
            <Link color="inherit" style={{ textDecoration: 'none', marginRight: 15, cursor: "pointer" }} onClick={() => handleLinkClick('/reviewPage')}>
              <Typography variant="h6" color="inherit" noWrap>
                ReviewPage
              </Typography>
            </Link>
            <Link color="inherit" style={{ textDecoration: 'none', cursor: "pointer" }} onClick={() => handleLinkClick('/myPage')}>
              <Typography variant="h6" color="inherit" noWrap>
                MyPage
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>
  
        <Typography variant="h5" color="inherit" noWrap>
          This is Review Page
        </Typography>
        
      </div>
    )
}
export default ReviewPage;
