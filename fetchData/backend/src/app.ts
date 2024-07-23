import express, {Response, Request} from "express"
import {generateFakeData, FetchApi} from "./tables/create_tables"
import cors from "cors";

// Config
const app = express()

// Use CORS middleware to allow requests from different origins
app.use(cors({
    origin: 'http://localhost:5173',
  }));


// connect to Database and create tables
generateFakeData()


// fetch data from database
const fetchData = async() => {
    try {
        const data = await FetchApi.find()
        return data
    } catch (error) {
        console.error("Error fetching data:", error)
    }

}

// API
app.get("/", async (req: Request, res: Response) => {
    const readData = await fetchData()
    res.json(readData)
})


const PORT = 8080

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})