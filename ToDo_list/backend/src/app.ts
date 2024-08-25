import express, { Request, Response } from 'express';
import { saveData, DataPoint } from './database/config'; // Import the saveData function
import cors from "cors";

const app = express();
;


// Use CORS middleware to allow requests from different origins
app.use(cors({
    origin: 'http://localhost:5173',
  }));

const port: number = 3000

saveData()

// fetch data from database
const fetchData = async() => {
  try {
      const data = await DataPoint.find()
      return data
  } catch (error) {
      console.error("Error fetching data:", error)
  }

}


// Define a route for the root path ('/')
app.get('/', async (req: Request, res: Response) => {
  const readData = await fetchData()
  res.json(readData)
});


// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
