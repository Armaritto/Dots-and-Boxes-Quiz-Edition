import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'dots_and_boxes'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

app.get('/api/teams', (req, res) => {
    db.query('SELECT * FROM teams', (err, results) => {
        if (err) {
            console.error('Error fetching teams:', err);
            res.status(500).send('Error fetching teams');
            return;
        }
        res.json(results);
    });
});

app.get('/api/questions', (req, res) => {
    db.query('SELECT * FROM questions', (err, results) => {
        if (err) {
            console.error('Error fetching questions:', err);
            res.status(500).send('Error fetching questions');
            return;
        }
        res.json(results);
    });
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});