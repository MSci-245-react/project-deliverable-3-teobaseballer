import * as React from 'react';

//used for the radio buttons
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

//MUI Typography Element
import Typography from "@mui/material/Typography";

const ReviewRating = ({ rating, handleRatingChange, showRatingError }) => {
  return (
    <div>
      <Typography variant="subtitle1">Rating:</Typography>
      <RadioGroup
        value={rating}
        onChange={handleRatingChange}
        row
        error={showRatingError}
      >
        {Array.from({ length: 5 }, (_, index) => index + 1).map((value) => (
          <FormControlLabel
            key={value}
            value={value.toString()}
            control={<Radio />}
            label={value.toString()}
          />
        ))}
      </RadioGroup>
      {showRatingError && (
        <Typography variant="subtitle2" style={{ color: "red" }}>
          Select the rating
        </Typography>
      )}
    </div>
  );
}

export default ReviewRating;
