import * as React from 'react';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

const MovieSelection = ({ movies, selectedMovie, handleMovieChange, showSelectError }) => {
  return (
    <div>
      <Typography variant="subtitle1">Select a movie:</Typography>
      <Select
        value={selectedMovie}
        onChange={handleMovieChange}
        displayEmpty
        fullWidth
        error={showSelectError}
      >
        <MenuItem value="" disabled>
          Select a movie
        </MenuItem>
        {movies.map((movie) => (
          <MenuItem key={movie.id} value={movie.name}>
            {movie.name}
          </MenuItem>
        ))}
      </Select>
      {showSelectError && (
        <Typography variant="subtitle2" style={{ color: "red" }}>
          Select your movie
        </Typography>
      )}
    </div>
  );
};

export default MovieSelection;
