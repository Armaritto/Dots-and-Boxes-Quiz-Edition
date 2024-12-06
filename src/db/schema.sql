-- Create admin table
CREATE TABLE admin(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(16) NOT NULL,
    pass VARCHAR(8) NOT NULL
);

-- Create teams table
CREATE TABLE teams(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    color VARCHAR(7) NOT NULL,
    admin_id INT,
    FOREIGN KEY (admin_id) REFERENCES admin(id) ON DELETE CASCADE
);

-- Create questions table
CREATE TABLE questions(
    id INT PRIMARY KEY AUTO_INCREMENT,
    text TEXT NOT NULL,
    team_id INT,
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
);

-- Create options table
CREATE TABLE options(
    id INT PRIMARY KEY AUTO_INCREMENT,
    is_correct BOOLEAN NOT NULL,
    text TEXT NOT NULL,
    question_id INT,
FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);