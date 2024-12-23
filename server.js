import express from 'express';
import mysql from 'mysql';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
app.use(express.json());
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

app.use(express.static('dist'));

// Authentication endpoint
app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT id, name FROM admin WHERE name = ? AND pass = ?',
        [username, password],
        (err, results) => {
            if (err) {
                console.error('Error during login:', err);
                res.status(500).send('Error during login');
                return;
            }
            if (results.length === 0) {
                res.status(401).json({ message: 'Invalid credentials' });
                return;
            }
            res.json({ id: results[0].id, username: results[0].name });
        }
    );
});

// Get teams for specific admin
app.get('/api/teams/:adminId', (req, res) => {
    const { adminId } = req.params;
    db.query('SELECT * FROM teams WHERE admin_id = ?',
        [adminId],
        (err, results) => {
            if (err) {
                console.error('Error fetching teams:', err);
                res.status(500).send('Error fetching teams');
                return;
            }
            res.json(results);
        }
    );
});

// Get questions for specific team
app.get('/api/questions/:teamId', (req, res) => {
    const { teamId } = req.params;
    db.query('SELECT q.* FROM questions q JOIN teams t ON q.team_id = t.id WHERE t.id = ?',
        [teamId],
        (err, results) => {
            if (err) {
                console.error('Error fetching questions:', err);
                res.status(500).send('Error fetching questions');
                return;
            }
            res.json(results);
        }
    );
});

app.get('/api/options', (req, res) => {
    db.query('SELECT * FROM options', (err, results) => {
        if (err) {
            console.error('Error fetching options:', err);
            res.status(500).send('Error fetching options');
            return;
        }
        res.json(results);
    });
});

app.get('/api/questions/:questionId/options', (req, res) => {
    const { questionId } = req.params;
    db.query('SELECT * FROM options WHERE question_id = ?', [questionId], (err, results) => {
        if (err) {
            console.error('Error fetching options for question:', err);
            res.status(500).send('Error fetching options for question');
            return;
        }
        res.json(results);
    });
});

app.post('/api/options', (req, res) => {
    const { is_correct, text, question_id } = req.body;
    db.query('INSERT INTO options (is_correct, text, question_id) VALUES (?, ?, ?)',
        [is_correct, text, question_id],
        (err, results) => {
            if (err) {
                console.error('Error creating option:', err);
                res.status(500).send('Error creating option');
                return;
            }
            res.status(201).json({ id: results.insertId });
        }
    );
});

app.put('/api/options/:id', (req, res) => {
    const { id } = req.params;
    const { is_correct, text, question_id } = req.body;
    db.query('UPDATE options SET is_correct = ?, text = ?, question_id = ? WHERE id = ?',
        [is_correct, text, question_id, id],
        (err) => {
            if (err) {
                console.error('Error updating option:', err);
                res.status(500).send('Error updating option');
                return;
            }
            res.sendStatus(204);
        }
    );
});

app.delete('/api/options/question/:questionId', (req, res) => {
    const { questionId } = req.params;
    db.query('DELETE FROM options WHERE question_id = ?', [questionId], (err, results) => {
        if (err) {
            console.error('Error deleting options:', err);
            res.status(500).send('Error deleting options');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('No options found for the given question ID');
            return;
        }
        res.sendStatus(204);
    });
});

app.post('/api/questions', (req, res) => {
    const { text, team_id } = req.body;
    db.query('INSERT INTO questions (text, team_id) VALUES (?, ?)',
        [text, team_id],
        (err, results) => {
            if (err) {
                console.error('Error creating question:', err);
                res.status(500).send('Error creating question');
                return;
            }
            res.status(201).json({ id: results.insertId });
        }
    );
});

app.put('/api/questions/:id', (req, res) => {
    const { id } = req.params;
    const { text, team_id } = req.body;
    db.query('UPDATE questions SET text = ?, team_id = ? WHERE id = ?',
        [text, team_id, id],
        (err) => {
            if (err) {
                console.error('Error updating question:', err);
                res.status(500).send('Error updating question');
                return;
            }
            res.sendStatus(204);
        }
    );
});

app.delete('/api/questions/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM questions WHERE id = ?', [id], (err) => {
        if (err) {
            console.error('Error deleting question:', err);
            res.status(500).send('Error deleting question');
            return;
        }
        res.sendStatus(204);
    });
});


// ALWAYS KEEP THIS AT THE END
app.get('*', (req, res) => {
    // Send index.html
    res.sendFile(__dirname + '/dist/index.html');
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});