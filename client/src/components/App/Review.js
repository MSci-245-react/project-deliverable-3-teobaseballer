import * as React from 'react';

//MUI Button
import Button from "@mui/material/Button";

//MUI Typography Element
import Typography from "@mui/material/Typography";

//MUI Grid Layout
import Grid from "@mui/material/Grid";

const Review = ({ handleSubmit, submittedReview }) => {
  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
      {submittedReview && (
        <div>
          <Typography variant="h5" color = "primary" marginBottom={2}>
            Your review has been received:
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1">Movie:</Typography>
              <Typography variant="body2">{submittedReview.movie}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">Title:</Typography>
              <Typography variant="body2">{submittedReview.title}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">Body:</Typography>
              <Typography variant="body2">{submittedReview.body}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">Rating:</Typography>
              <Typography variant="body2">{submittedReview.rating}</Typography>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
}

export default Review;