import React, { useState } from 'react';
import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';

import { AppBar, Toolbar, TextField, Button } from '@mui/material';

const Search = () => {
    const navigate = useNavigate();

    const handleLinkClick = (path) => {
      navigate(path);
    };

    const [movieTitle, setMovieTitle] = useState('');
    const [actorName, setActorName] = useState('');
    const [directorName, setDirectorName] = useState('');

    const handleSearch = () => {
      let sqlStatement = 'SELECT * FROM movies WHERE ';

      const searchCriteria = [];

      if (movieTitle) {
          searchCriteria.push(`title LIKE '%${movieTitle}%'`);
      }

      if (actorName) {
          const [firstName, lastName] = actorName.split(' ');
          searchCriteria.push(`actor_first_name LIKE '%${firstName}%' AND actor_last_name LIKE '%${lastName}%'`);
      }

      if (directorName) {
          const [firstName, lastName] = directorName.split(' ');
          searchCriteria.push(`director_first_name LIKE '%${firstName}%' AND director_last_name LIKE '%${lastName}%'`);
      }

      sqlStatement += searchCriteria.join(' AND ');

      fetch('/api/movies', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sqlStatement }),
    })
        .then((response) => response.json())
        .then((data) => {

        })
        .catch((error) => {
            console.error('Error fetching movies:', error);
        });
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
          This is Search Page
        
        </Typography>
        <TextField
                label="Search by Movie Title"
                variant="outlined"
                fullWidth
                style={{ marginTop: 20 }}
                value={movieTitle}
                onChange={(e) => setMovieTitle(e.target.value)}
            />
            <TextField
                label="Search by Actor's First Name + Last Name"
                variant="outlined"
                fullWidth
                style={{ marginTop: 20 }}
                value={actorName}
                onChange={(e) => setActorName(e.target.value)}
            />
            <TextField
                label="Search by Director's First Name + Last Name"
                variant="outlined"
                fullWidth
                style={{ marginTop: 20, marginBottom: 20 }}
                value={directorName}
                onChange={(e) => setDirectorName(e.target.value)}
            />

            <Button variant="contained" color="primary" onClick={handleSearch}>
                Search
            </Button>
        </div>

    )
}
export default Search;
