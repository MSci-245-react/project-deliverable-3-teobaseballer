import * as React from 'react';

//MUI Typography Element
import Typography from "@mui/material/Typography";

import MovieSelection from './MovieSelection';
import ReviewTitle from './ReviewTitle';
import ReviewBody from './ReviewBody';
import ReviewRating from './ReviewRating';
import Review from './Review';

const App = () => {

  const [movies, setMovies] = React.useState([]);

  React.useEffect(() => {
    fetch('/api/getMovies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => setMovies(data))
      .catch(error => console.error(error));
  }, []);

  const [currentUser, setCurrentUser] = React.useState(null);

  //selecting movie

  const [selectedMovie, setSelectedMovie] = React.useState('');

  //title of the movie review

  const [reviewTitle, setReviewTitle] = React.useState('');

  //movie review

  const [reviewBody, setReviewBody] = React.useState('');

  //movie rating

  const [rating, setRating] = React.useState('');

  //if user doesn't select movie

  const [showSelectError, setShowSelectError] = React.useState(false);

  //if user doesn't enter movie review title

  const [showTitleError, setShowTitleError] = React.useState(false);

  //if user doesn't enter movie review body text

  const [showBodyError, setShowBodyError] = React.useState(false);

  //if user doesn't enter movie rating

  const [showRatingError, setShowRatingError] = React.useState(false);

  //after the review is submitted  

  const [submittedReview, setSubmittedReview] = React.useState(null);

  //handle movie selection event

  const handleMovieChange = (event) => {
    setSelectedMovie(event.target.value);
  };

  //handle entering movie review title event

  const handleReviewTitleChange = (event) => {
    setReviewTitle(event.target.value);
  };

  //handle movie review event (up to 200 characters)

  const handleReviewBodyChange = (event) => {
    setReviewBody(event.target.value.slice(0, 200));
  };

  //handle movie rating event

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  //handle "submit" button event

  const handleSubmit = () => {

    //error handling if statements for when user leaves an input field empty

    if (!selectedMovie) {
      setShowSelectError(true);
    } else {
      setShowSelectError(false);
    }

    if (!reviewTitle) {
      setShowTitleError(true);
    } else {
      setShowTitleError(false);
    }

    if (!reviewBody) {
      setShowBodyError(true);
    } else {
      setShowBodyError(false);
    }

    if (!rating) {
      setShowRatingError(true);
    } else {
      setShowRatingError(false);
    }

    //resetting input fields after user clicks submit

    if (selectedMovie && reviewTitle && reviewBody && rating) {
      setSubmittedReview({
        movie: selectedMovie,
        title: reviewTitle,
        body: reviewBody,
        rating: rating
      });

      const reviewData = {
        movieId: selectedMovie,
        userId: currentUser && currentUser.id,
        reviewTitle,
        reviewBody,
        rating
      };
    
      fetch('/api/addReview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewData)
      })
        .then(response => response.json())
        .then(data => {
          console.log('Review added successfully');
        })
        .catch(error => {
          console.error('Error adding review:', error);
        });

      setSelectedMovie('');
      setReviewTitle('');
      setReviewBody('');
      setRating('');
    }
  };

  return (
    <Router>
      <Routes>
<Route path="/Home" element={<Home />} />
<Route path="/Landing" element={<Landing />} />
<Route path="/Search" element={<Search />} />
<Route path="/Review" element={<Review />} />
<Route path="/MyPage" element={<MyPage />} />
</Routes>
    <div>
      <Typography variant="h3" component="h1">
        Review a Movie
      </Typography>

      <MovieSelection
        movies={movies}
        selectedMovie={selectedMovie}
        handleMovieChange={handleMovieChange}
        showSelectError={showSelectError}
      />
      <ReviewTitle
        reviewTitle={reviewTitle}
        handleReviewTitleChange={handleReviewTitleChange}
        showTitleError={showTitleError}
      />
      <ReviewBody
        reviewBody={reviewBody}
        handleReviewBodyChange={handleReviewBodyChange}
        showBodyError={showBodyError}
      />
      <ReviewRating
        rating={rating}
        handleRatingChange={handleRatingChange}
        showRatingError={showRatingError}
      />
      <Review
        handleSubmit={handleSubmit}
        submittedReview={submittedReview}
      />
    </div>
    </Router>
  );
}

export default App;
