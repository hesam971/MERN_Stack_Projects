// create_table.js
import mongoose, { Schema, Document, Model } from 'mongoose';
import { faker } from '@faker-js/faker';

type DataPoint = {
  date: string;
  SolarPanels: number;
  Inverters: number;
}

const URL: string = 'mongodb+srv://hesam971:123456abcd@test.0ephq.mongodb.net/?retryWrites=true&w=majority&appName=Test';

export const config = async (): Promise<void> => {
  try {
    await mongoose.connect(URL);
    console.log('Connected!');

    // Generate data points
    const data = generateDataPoints(50);

    // Save data points to the database
    await DataPoint.insertMany(data);
    console.log('Data has been saved successfully');

    // Close the connection
    await mongoose.connection.close();
    console.log('Connection closed');
  } catch (error) {
    console.error('Connection error:', error);
  }
};
  
// Create a Mongoose schema for the data
const DataPointSchema: Schema = new Schema({
  date: { type: String, required: true },
  SolarPanels: { type: Number, required: true },
  Inverters: { type: Number, required: true },
});

// Create a Mongoose model for the data
export const DataPoint: Model<DataPoint> = mongoose.model<DataPoint>('DataPoint', DataPointSchema);

// Function to generate data points
function generateDataPoints(numPoints: number): DataPoint[] {
  const data: DataPoint[] = [];
  let currentDate = new Date(2022, 0); // Start in January 2022

  for (let i = 0; i < numPoints; i++) {
    const SolarPanels = faker.number.int({ min: 2500, max: 4000 });
    const Inverters = faker.number.int({ min: 1500, max: 6000 });

    const date = `${currentDate.toLocaleString('default', { month: 'short' })} ${currentDate.getFullYear().toString().slice(-2)}`;

    const dataPoint = new DataPoint({
      date,
      SolarPanels,
      Inverters,
    });

    data.push(dataPoint);

    // Move to the next month
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  return data;
}

// Connect to MongoDB and save data
export async function saveData(): Promise<void> {
  try {
    // Connect to MongoDB
    await mongoose.connect(URL);
    console.log('Connected to MongoDB');

    // Generate data points
    const data = generateDataPoints(50);

    // Save data points to the database
    await DataPoint.insertMany(data);
    console.log('Data has been saved successfully');

  } catch (err) {
    console.error('Error:', err);
  }
}
