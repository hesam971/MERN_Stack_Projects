import express, { Request, Response } from 'express';
import mongoose from 'mongoose'
import { URL } from './database/config'
import User from './database/schema'
import cors from 'cors'

// Create an Express application
const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

type UserInformation = {
  username: string,
  lastname: string,
  email: string
}

// Connect to MongoDB
mongoose.connect(URL).then(() => {
  try {
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log(error)
  }
})


// Define a route for the root path ('/')
app.get('/', (req: Request, res: Response) => {
  // find all the users
  User.find().then((users) => {
    res.status(200).json({message: users})
  }).catch((error: Error) => {
    res.status(400).json({message: error})
  })
});

// Define a route for storing data ('/new_user')
app.post('/new_user', (req: Request, res: Response) => {
  const { username, lastname, email }: UserInformation = req.body
  const user = new User({username,lastname,email})
  user.save().then(() => {
    console.log('User saved')
    res.status(201).json({message: user})
  }).catch((error: Error) => {
    res.status(400).json({message: error})
  })
});

// Define a route for deleting data ('/delete')
app.delete('/delete', (req: Request, res: Response) => {
  const { email } = req.body
  User.findOneAndDelete([email]).then(() => {
    console.log('user delete successfuly')
    res.status(201).json({message: 'user deleted'})
  }).catch((error: Error) => {
    res.status(400).json({message: error})
  })
});


// Specify the port number for the server
const port: number = 3000;

// Start the server and listen on the specified port
app.listen(port, () => {
  // Log a message when the server is successfully running
  console.log(`Server is running on http://localhost:${port}`);
});