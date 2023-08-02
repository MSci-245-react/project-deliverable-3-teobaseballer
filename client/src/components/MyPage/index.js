import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';

import { AppBar, Toolbar } from '@mui/material';

const MyPage = () => {
  const navigate = useNavigate();

  const handleLinkClick = (path) => {
    navigate(path);
  };

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState('');
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [userFeedback, setUserFeedback] = useState({});

  useEffect(() => {
    fetch('/api/getMovies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);

        if (data.length > 0) {
          setSelectedMovie(data[0].name);
          handleMovieSelect(data[0].name);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const handleMovieSelect = (movieTitle) => {
    setSelectedMovie(movieTitle);
    const selectedMovieData = movies.find((movie) => movie.name === movieTitle);

    if (selectedMovieData) {
      const leadActors = selectedMovieData.leadActors;
      const recommendations = movies.filter(
        (movie) => movie !== selectedMovieData && movie.leadActors && movie.leadActors.some((actor) => leadActors.includes(actor))
      );
      setRecommendedMovies(recommendations);
    } else {
      setRecommendedMovies([]);
    }
  };

  const handleUserFeedback = (movieTitle, liked) => {
    setUserFeedback((prevFeedback) => ({
      ...prevFeedback,
      [movieTitle]: liked,
    }));

    const updatedRecommendedMovies = recommendedMovies.filter(
      (movie) => movie.name !== movieTitle || (movie.name === movieTitle && liked)
    );
    setRecommendedMovies(updatedRecommendedMovies);
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
        This is MyPage Page
      </Typography>

      <div>
        <label>
          Select a movie:
          <select value={selectedMovie} onChange={(e) => handleMovieSelect(e.target.value)}>
            {movies.map((movie) => (
              <option key={movie.id} value={movie.name}>
                {movie.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <Typography variant="h6" color="inherit" noWrap>
          Recommendations:
        </Typography>
        {recommendedMovies.length === 0 ? (
          <Typography variant="body1" color="inherit" noWrap>
            No recommendations available for this movie.
          </Typography>
        ) : (
          <ul>
            {recommendedMovies.map((movie) => (
              <li key={movie.id}>
                {movie.name}{' '}
                <button onClick={() => handleUserFeedback(movie.name, true)}>Like</button>
                <button onClick={() => handleUserFeedback(movie.name, false)}>Dislike</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MyPage;
