import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './db';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'Welcome to Habit Hero API!',
        status: 'API is running successfully',
        routes: {
            users: '/users',
            habits: '/habits',
            reminders: '/reminders',
            streaks: '/streaks'
        }
    });
});

/** USERS */

/**
 * @route POST /users
 * @description Create a new user
 */
app.post('/users', async (req: Request, res: Response) => {
    const { username, email, password, preferences } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO users (username, email, password, preferences) VALUES (?, ?, ?, ?)',
            [username, email, password, preferences]
        );
        res.status(201).json({ message: 'User created successfully', userID: (result as any).insertId });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
});

/**
 * @route GET /users
 * @description Get all users
 */
app.get('/users', async (req: Request, res: Response) => {
    try {
        const [rows] = await db.query('SELECT * FROM users');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
});

/**
 * @route GET /users/:id
 * @description Get a user by ID
 */
app.get('/users/:id', async (req: Request, res: Response): Promise<void> => {
  const userID = req.params.id;
  try {
      const [rows] = await db.query('SELECT * FROM users WHERE userID = ?', [userID]);
      if ((rows as any).length === 0) {
          res.status(404).json({ error: 'User not found' });
      } else {
          res.json((rows as any)[0]);
      }
  } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve user' });
  }
});

/**
 * @route PUT /users/:id
 * @description Update a user by ID
 */
app.put('/users/:id', async (req: Request, res: Response) => {
    const userID = req.params.id;
    const { username, email, password, preferences } = req.body;
    try {
        const [result] = await db.query(
            'UPDATE users SET username = ?, email = ?, password = ?, preferences = ? WHERE userID = ?',
            [username, email, password, preferences, userID]
        );
        res.json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
});

/**
 * @route DELETE /users/:id
 * @description Delete a user by ID
 */
app.delete('/users/:id', async (req: Request, res: Response) => {
    const userID = req.params.id;
    try {
        await db.query('DELETE FROM users WHERE userID = ?', [userID]);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

/** HABITS */

/**
 * @route POST /habits
 * @description Create a new habit
 */
app.post('/habits', async (req: Request, res: Response) => {
    const { userID, name, category, startDate, frequency, goal } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO habits (userID, name, category, startDate, frequency, goal) VALUES (?, ?, ?, ?, ?, ?)',
            [userID, name, category, startDate, frequency, goal]
        );
        res.status(201).json({ message: 'Habit created successfully', habitID: (result as any).insertId });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create habit' });
    }
});

/**
 * @route GET /habits
 * @description Get all habits
 */
app.get('/habits', async (req: Request, res: Response) => {
    try {
        const [rows] = await db.query('SELECT * FROM habits');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve habits' });
    }
});

/**
 * @route GET /habits/:id
 * @description Get a habit by ID
 */
app.get('/habits/:id', async (req: Request, res: Response): Promise<void> => {
    const habitID = req.params.id;
    try {
        const [rows] = await db.query('SELECT * FROM habits WHERE habitID = ?', [habitID]);
        if ((rows as any).length === 0) {
            res.status(404).json({ error: 'Habit not found' });
        }
        res.json((rows as any)[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve habit' });
    }
});

/**
 * @route PUT /habits/:id
 * @description Update a habit by ID
 */
app.put('/habits/:id', async (req: Request, res: Response) => {
    const habitID = req.params.id;
    const { name, category, startDate, frequency, goal } = req.body;
    try {
        const [result] = await db.query(
            'UPDATE habits SET name = ?, category = ?, startDate = ?, frequency = ?, goal = ? WHERE habitID = ?',
            [name, category, startDate, frequency, goal, habitID]
        );
        res.json({ message: 'Habit updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update habit' });
    }
});

/**
 * @route DELETE /habits/:id
 * @description Delete a habit by ID
 */
app.delete('/habits/:id', async (req: Request, res: Response) => {
    const habitID = req.params.id;
    try {
        await db.query('DELETE FROM habits WHERE habitID = ?', [habitID]);
        res.json({ message: 'Habit deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete habit' });
    }
});

/** REMINDERS */

/**
 * @route POST /reminders
 * @description Create a new reminder
 */
app.post('/reminders', async (req: Request, res: Response) => {
    const { userID, habitID, time } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO reminders (userID, habitID, time) VALUES (?, ?, ?)',
            [userID, habitID, time]
        );
        res.status(201).json({ message: 'Reminder created successfully', reminderID: (result as any).insertId });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create reminder' });
    }
});

/**
 * @route GET /reminders
 * @description Get all reminders
 */
app.get('/reminders', async (req: Request, res: Response) => {
    try {
        const [rows] = await db.query('SELECT * FROM reminders');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve reminders' });
    }
});

/**
 * @route GET /reminders/:id
 * @description Get a reminder by ID
 */
app.get('/reminders/:id', async (req: Request, res: Response): Promise<void> => {
    const reminderID = req.params.id;
    try {
        const [rows] = await db.query('SELECT * FROM reminders WHERE reminderID = ?', [reminderID]);
        if ((rows as any).length === 0) {
            res.status(404).json({ error: 'Reminder not found' });
        }
        res.json((rows as any)[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve reminder' });
    }
});

/**
 * @route PUT /reminders/:id
 * @description Update a reminder by ID
 */
app.put('/reminders/:id', async (req: Request, res: Response) => {
    const reminderID = req.params.id;
    const { time } = req.body;
    try {
        const [result] = await db.query(
            'UPDATE reminders SET time = ? WHERE reminderID = ?',
            [time, reminderID]
        );
        res.json({ message: 'Reminder updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update reminder' });
    }
});

/**
 * @route DELETE /reminders/:id
 * @description Delete a reminder by ID
 */
app.delete('/reminders/:id', async (req: Request, res: Response) => {
    const reminderID = req.params.id;
    try {
        await db.query('DELETE FROM reminders WHERE reminderID = ?', [reminderID]);
        res.json({ message: 'Reminder deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete reminder' });
    }
});

/** STREAKS */

/**
 * @route POST /streaks
 * @description Log a streak for a habit
 */
app.post('/streaks', async (req: Request, res: Response) => {
    const { habitID, date, completed } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO streaks (habitID, date, completed) VALUES (?, ?, ?)',
            [habitID, date, completed]
        );
        res.status(201).json({ message: 'Streak logged successfully', streakID: (result as any).insertId });
    } catch (error) {
        res.status(500).json({ error: 'Failed to log streak' });
    }
});

/**
 * @route GET /streaks
 * @description Get all streaks
 */
app.get('/streaks', async (req: Request, res: Response) => {
    try {
        const [rows] = await db.query('SELECT * FROM streaks');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve streaks' });
    }
});

/**
 * @route GET /streaks/:id
 * @description Get a streak by ID
 */
app.get('/streaks/:id', async (req: Request, res: Response): Promise<void> => {
    const streakID = req.params.id;
    try {
        const [rows] = await db.query('SELECT * FROM streaks WHERE streakID = ?', [streakID]);
        if ((rows as any).length === 0) {
          res.status(404).json({ error: 'Streak not found' });
        }
        res.json((rows as any)[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve streak' });
    }
});

/**
 * @route PUT /streaks/:id
 * @description Update a streak by ID
 */
app.put('/streaks/:id', async (req: Request, res: Response) => {
    const streakID = req.params.id;
    const { date, completed } = req.body;
    try {
        const [result] = await db.query(
            'UPDATE streaks SET date = ?, completed = ? WHERE streakID = ?',
            [date, completed, streakID]
        );
        res.json({ message: 'Streak updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update streak' });
    }
});

/**
 * @route DELETE /streaks/:id
 * @description Delete a streak by ID
 */
app.delete('/streaks/:id', async (req: Request, res: Response) => {
    const streakID = req.params.id;
    try {
        await db.query('DELETE FROM streaks WHERE streakID = ?', [streakID]);
        res.json({ message: 'Streak deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete streak' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
