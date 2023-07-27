import React from 'react';
import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
const MyPage = () => {
const navigate = useNavigate();

useEffect(() => {
    fetch('/api/getReviews')
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error('Error fetching reviews:', error));
  }, []);

return (
<div>
<Typography variant="h3" color="inherit" noWrap>
This is MyPage Page
</Typography>

{reviews.map((review) => (
        <div key={review.reviewId}>
          <Typography variant="h6" color="inherit" noWrap>
            Movie: {review.movieTitle}
          </Typography>
          <Typography variant="subtitle1" color="inherit" noWrap>
            Review Title: {review.reviewTitle}
          </Typography>
          <Typography variant="body1" color="inherit" noWrap>
            Review: {review.reviewBody}
          </Typography>
          <Typography variant="body2" color="inherit" noWrap>
            Rating: {review.rating}
          </Typography>
        </div>
      ))}

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
