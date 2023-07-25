import * as React from 'react';

//MUI Text Field
import TextField from "@mui/material/TextField";

//MUI Typography Element
import Typography from "@mui/material/Typography";

const ReviewTitle = ({ reviewTitle, handleReviewTitleChange, showTitleError }) => {
  return (
    <div>
      <Typography variant="subtitle1">Review Title:</Typography>
      <TextField
        value={reviewTitle}
        onChange={handleReviewTitleChange}
        variant="outlined"
        fullWidth
        error={showTitleError}
      />
      {showTitleError && (
        <Typography variant="subtitle2" style={{ color: "red" }}>
          Enter your review title
        </Typography>
      )}
    </div>
  );
}

export default ReviewTitle;
