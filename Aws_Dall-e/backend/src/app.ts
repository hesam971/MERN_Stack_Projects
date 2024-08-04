// Import the 'express' module along with 'Request' and 'Response' types from express
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
const bcrypt = require('bcrypt');

// connect to database
import User, { config} from './database/config';
config()

// Create an Express application
const app = express();

// Use the body-parser middleware to parse request bodies
app.use(bodyParser.json());
// Use the 'cors' middleware to allow cross-origin requests
app.use(cors({
    origin: 'http://localhost:5173',
  }));

  type userInformation = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    favoriteSport: string;
}

// Specify the port number for the server
const port: string | number = process.env.PORT || 3000;


app.post('/register', async (req:Request, res: Response) => {
  const {firstName, lastName, email, password, favoriteSport}: userInformation = req.body

  bcrypt.hash(password, 10, (err:Error, hash:string) => {
  if (err) {
    console.error('Error:', err);
  }else{
      
  try {

    const newUser = new User({ firstName, lastName, email, password:hash, favoriteSport });
    newUser.save();

  }catch(error){
    if(error instanceof Error) console.error('Error:', error);
  }

  }

 });
})


app.post('/login', async (req:Request, res: Response) => {
  const {email, password}: userInformation = req.body

  const user = await User.findOne({email})
  if(!user){
    res.status(404).json({message: 'User not found'})
  }
  if(user){
    res.status(200).json({userId:user._id})
  }
});

app.get('/dashboard/:id', async (req:Request, res: Response) => {

  const user = await User.findById(req.params.id);
  if(!user){
    res.status(404).json({message: 'User not found'})
  }
  if(user){
    res.status(200).json({sport:user.favoriteSport, username:user.firstName})
  }
});

// Start the server and listen on the specified port
app.listen(port, () => {
  // Log a message when the server is successfully running
  console.log(`Server is running on http://localhost:${port}`);
});