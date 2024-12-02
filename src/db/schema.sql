-- Create teams table
CREATE TABLE teams (
  id INT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  color VARCHAR(7) NOT NULL,
  score INT DEFAULT 0
);

-- Create questions table
CREATE TABLE questions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  team_id INT,
  text VARCHAR(255) NOT NULL,
  correct_option INT NOT NULL,
  FOREIGN KEY (team_id) REFERENCES teams(id)
);

-- Create options table
CREATE TABLE options (
  id INT PRIMARY KEY AUTO_INCREMENT,
  question_id INT,
  option_text VARCHAR(255) NOT NULL,
  option_order INT NOT NULL,
  FOREIGN KEY (question_id) REFERENCES questions(id)
);

-- Create answered_questions table
CREATE TABLE answered_questions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  team_id INT,
  question_id INT,
  answered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(id),
  FOREIGN KEY (question_id) REFERENCES questions(id)
);