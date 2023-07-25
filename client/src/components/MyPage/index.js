import React from 'react';
import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
const MyPage = () => {
const navigate = useNavigate();
return (
<div>
<Typography variant="h3" color="inherit" noWrap>
This is MyPage Page
</Typography>
<Link
color="inherit"
style={{ cursor: "pointer" }}
onClick={() => navigate('/Home')}
>
<Typography variant="h5" color="inherit" noWrap>
Navigate to Home Page
</Typography>
</Link>
<Link
color="inherit"
style={{ cursor: "pointer" }}
onClick={() => navigate('/Search')}
>
<Typography variant="h5" color="inherit" noWrap>
Navigate to Search Page
</Typography>
</Link>
<Link 
color="inherit" 
style={{ cursor: "pointer" }} 
onClick={() => navigate('/Review')}
>
<Typography variant="h5" color="inherit" noWrap>
Navigate to Review Page
</Typography>
</Link>
<Link 
color="inherit" 
style={{ cursor: "pointer" }} 
onClick={() => navigate('/Landing')}
>
<Typography variant="h5" color="inherit" noWrap>
Navigate to Landing
</Typography>
</Link>
</div>
)
}
export default MyPage;
