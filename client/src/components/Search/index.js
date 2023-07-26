import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    title: '',
    actorName: '',
    directorName: '',
  });

  const [movieResults, setMovieResults] = useState([]); 

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSearchData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    const searchConditions = {
      ...searchData,
    };

    fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(searchConditions),
    })
      .then((response) => response.json())
      .then((data) => {
        setMovieResults(data); 
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <Typography variant="h3" color="inherit" noWrap>
          This is Search Page
        </Typography>
        <div>
          <Link
            color="inherit"
            component="button"
            onClick={() => navigate('/Landing')}
            style={{ marginRight: '20px' }}
          >
            Landing
          </Link>
          <Link
            color="inherit"
            component="button"
            onClick={() => navigate('/Review')}
            style={{ marginRight: '20px' }}
          >
            Review
          </Link>
          <Link color="inherit" component="button" onClick={() => navigate('/MyPage')}>
            MyPage
          </Link>
        </div>
      </div>

      <TextField
        label="Search by Movie Title"
        name="title"
        value={searchData.title}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        margin="normal"
      />

      <TextField
        label="Search by Actor's Full Name"
        name="actorName"
        value={searchData.actorName}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        margin="normal"
      />

      <TextField
        label="Search by Director's Full Name"
        name="directorName"
        value={searchData.directorName}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        margin="normal"
      />

      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>

      <Typography variant="h4" color="inherit" noWrap style={{ marginTop: '20px' }}>
        Movie Search Results
      </Typography>
      <table style={{ width: '100%', marginTop: '10px' }}>
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Director</th>
            <th>Reviews</th>
            <th>Average Rating</th>
          </tr>
        </thead>
        <tbody>
          {movieResults.map((movie, index) => (
            <tr key={index}>
              <td>{movie.title}</td>
              <td>{movie.director}</td>
              <td>
                <ul>
                  {movie.reviews.map((review, reviewIndex) => (
                    <li key={reviewIndex}>{review}</li>
                  ))}
                </ul>
              </td>
              <td>{movie.averageRating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Search;
