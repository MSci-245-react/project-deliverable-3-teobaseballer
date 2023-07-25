import mysql from 'mysql';
import config from './config.js';
import express from 'express';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.post('/api/loadUserSettings', (req, res) => {
  let connection = mysql.createConnection(config);
  let userID = req.body.userID;

  let sql = `SELECT mode FROM user WHERE userID = ?`;
  let data = [userID];

  connection.query(sql, data, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }

    let string = JSON.stringify(results);
    res.send({ express: string });
  });

  connection.end();
});

app.post('/api/getMovies', (req, res) => {
  let connection = mysql.createConnection(config);

  let sql = `SELECT id, name, year, quality FROM eteo.movies`;

  connection.query(sql, (error, results, fields) => {
    if (error) {
      return res.status(500).json({ error: 'An error occurred while retrieving movies' });
    }

    res.status(200).json(results);
  });

  connection.end();
});

app.post('/api/addReview', (req, res) => {
  let connection = mysql.createConnection(config);

  let { movieId, userId, reviewTitle, reviewBody, rating } = req.body;

  let sql = `INSERT INTO Review (movie_id, user_id, review_title, review_Body, rating) VALUES (?, ?, ?, ?, ?)`;
  let data = [movieId, userId, reviewTitle, reviewBody, rating];

  connection.query(sql, data, (error, results, fields) => {
    if (error) {
      return res.status(500).json({ error: 'An error occurred while adding the review' });
    }

    res.status(200).json({ message: 'Review added successfully' });
  });

  connection.end();
});

  
  

app.listen(port, () => console.log(`Listening on port ${port}`));
