import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import User from './database/schema';
import {mongoUri} from './database/connect'

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:5173',
  }));

type userInformation = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

// database config
mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB connected'))

// get register values
app.post('/register', async (req: Request, res: Response) => {
  const { firstName, lastName, email, password }:userInformation = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        // catch if there is an error
      return res.status(400).json({ error: 'This email is already signed up.' });
    }

    const newUser = new User({ firstName, lastName, email, password });
    await newUser.save();
    res.status(200).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// get login values
app.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
        // catch if there is an error
      return res.status(400).json({ error: 'This email is not registered.' });
    }

    if (user.password !== password) {
      return res.status(400).json({ error: 'Incorrect password.' });
    }

    res.status(200).json({ message: 'Login successful', userId: user._id });
    
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// get user details
app.get('/dashboard/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('firstName');
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    res.status(200).json({ username: user.firstName });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
