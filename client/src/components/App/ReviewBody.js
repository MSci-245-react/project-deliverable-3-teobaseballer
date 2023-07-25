import * as React from 'react';

//MUI Text Field
import TextField from "@mui/material/TextField";

//MUI Typography Element
import Typography from "@mui/material/Typography";

const ReviewBody = ({ reviewBody, handleReviewBodyChange, showBodyError }) => {
  return (
    <div>
      <Typography variant="subtitle1">Review Body:</Typography>
      <TextField
        value={reviewBody}
        onChange={handleReviewBodyChange}
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        error={showBodyError}
      />
      {showBodyError && (
        <Typography variant="subtitle2" style={{ color: "red" }}>
          Enter your review
        </Typography>
      )}
    </div>
  );
}

export default ReviewBody;