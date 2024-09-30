"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_1 = __importDefault(require("./db"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json()); // Parse JSON request bodies
const PORT = process.env.PORT || 3000;
/**
 * @route GET /
 * @description Basic status check for the API
 */
app.get('/', (req, res) => {
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
/**
 * @route POST /users
 * @description Create a new user
 */
app.post('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, preferences } = req.body;
    try {
        const [result] = yield db_1.default.query('INSERT INTO users (username, email, password, preferences) VALUES (?, ?, ?, ?)', [username, email, password, preferences]);
        res.status(201).json({ message: 'User created successfully', userID: result.insertId });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
}));
/**
 * @route GET /users
 * @description Get all users
 */
app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.default.query('SELECT * FROM users');
        res.json(rows);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
}));
/**
 * @route GET /users/:id
 * @description Get a user by ID
//  */
// app.get('/users/:id', async (req: Request, res: Response) => {
//     const userID = req.params.id;
//     try {
//         const [rows] = await db.query('SELECT * FROM users WHERE userID = ?', [userID]);
//         if ((rows as any).length === 0) {
//             return res.status(404).json({ error: 'User not found' });
//         }
//         res.json((rows as any)[0]);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to retrieve user' });
//     }
// });
/**
 * @route POST /habits
 * @description Create a new habit
 */
app.post('/habits', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID, name, category, startDate, frequency, goal } = req.body;
    try {
        const [result] = yield db_1.default.query('INSERT INTO habits (userID, name, category, startDate, frequency, goal) VALUES (?, ?, ?, ?, ?, ?)', [userID, name, category, startDate, frequency, goal]);
        res.status(201).json({ message: 'Habit created successfully', habitID: result.insertId });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create habit' });
    }
}));
/**
 * @route GET /habits
 * @description Get all habits
 */
app.get('/habits', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.default.query('SELECT * FROM habits');
        res.json(rows);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve habits' });
    }
}));
/**
 * @route GET /habits/:userID
 * @description Get all habits for a specific user
 */
app.get('/habits/:userID', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = req.params.userID;
    try {
        const [rows] = yield db_1.default.query('SELECT * FROM habits WHERE userID = ?', [userID]);
        res.json(rows);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve habits' });
    }
}));
/**
 * @route POST /reminders
 * @description Create a reminder for a habit
 */
app.post('/reminders', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID, habitID, time } = req.body;
    try {
        const [result] = yield db_1.default.query('INSERT INTO reminders (userID, habitID, time) VALUES (?, ?, ?)', [userID, habitID, time]);
        res.status(201).json({ message: 'Reminder created successfully', reminderID: result.insertId });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create reminder' });
    }
}));
/**
 * @route POST /streaks
 * @description Log a streak for a habit
 */
app.post('/streaks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { habitID, date, completed } = req.body;
    try {
        const [result] = yield db_1.default.query('INSERT INTO streaks (habitID, date, completed) VALUES (?, ?, ?)', [habitID, date, completed]);
        res.status(201).json({ message: 'Streak logged successfully', streakID: result.insertId });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to log streak' });
    }
}));
/**
 * @route GET /streaks
 * @description Get all streaks
 */
app.get('/streaks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.default.query('SELECT * FROM streaks');
        res.json(rows);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve streaks' });
    }
}));
/**
 * @route GET /streaks/:habitID
 * @description Get streaks for a specific habit
 */
app.get('/streaks/:habitID', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const habitID = req.params.habitID;
    try {
        const [rows] = yield db_1.default.query('SELECT * FROM streaks WHERE habitID = ?', [habitID]);
        res.json(rows);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve streaks' });
    }
}));
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
