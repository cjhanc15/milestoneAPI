-- Create 'habit_hero' database if it doesn't exist
CREATE DATABASE IF NOT EXISTS habit_hero;
USE habit_hero;

-- Create 'users' table
CREATE TABLE IF NOT EXISTS users (
    userID INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    preferences TEXT
);

-- Create 'habits' table
CREATE TABLE IF NOT EXISTS habits (
    habitID INT PRIMARY KEY AUTO_INCREMENT,
    userID INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    startDate DATE NOT NULL,
    frequency VARCHAR(50),
    goal VARCHAR(255),
    currentStreak INT DEFAULT 0,
    longestStreak INT DEFAULT 0,
    status VARCHAR(50) DEFAULT 'active',
    FOREIGN KEY (userID) REFERENCES users(userID) ON DELETE CASCADE
);

-- Create 'reminders' table
CREATE TABLE IF NOT EXISTS reminders (
    reminderID INT PRIMARY KEY AUTO_INCREMENT,
    userID INT NOT NULL,
    habitID INT NOT NULL,
    time TIME NOT NULL,
    FOREIGN KEY (userID) REFERENCES users(userID) ON DELETE CASCADE,
    FOREIGN KEY (habitID) REFERENCES habits(habitID) ON DELETE CASCADE
);

-- Create 'streaks' table
CREATE TABLE IF NOT EXISTS streaks (
    streakID INT PRIMARY KEY AUTO_INCREMENT,
    habitID INT NOT NULL,
    date DATE NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (habitID) REFERENCES habits(habitID) ON DELETE CASCADE
);

-- Seed data for 'users' table
INSERT INTO users (username, email, password, preferences)
VALUES 
('JohnDoe', 'john@example.com', 'password123', '{"theme": "dark"}'),
('JaneSmith', 'jane@example.com', 'password456', '{"theme": "light"}');

-- Seed data for 'habits' table
INSERT INTO habits (userID, name, category, startDate, frequency, goal)
VALUES
(1, 'Morning Run', 'Exercise', '2024-01-01', 'Daily', 'Run 5 miles'),
(2, 'Read Books', 'Personal Development', '2024-01-01', 'Weekly', 'Read 2 books per month');

-- Seed data for 'reminders' table
INSERT INTO reminders (userID, habitID, time)
VALUES
(1, 1, '06:00:00'),
(2, 2, '18:00:00');

-- Seed data for 'streaks' table
INSERT INTO streaks (habitID, date, completed)
VALUES
(1, '2024-01-01', TRUE),
(1, '2024-01-02', TRUE),
(2, '2024-01-05', TRUE);
