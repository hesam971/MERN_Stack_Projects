import mongoose, { Schema, Document, Model } from 'mongoose';
import { faker } from '@faker-js/faker';

// MongoDB Connection String
const URL: string = 'mongodb+srv://hesam971:123456abcd@test.0ephq.mongodb.net/?retryWrites=true&w=majority&appName=Test';

// Define an interface for the line chart data structure (previously defined)
type DataPoint = Document & {
  date: string;
  SolarPanels: number;
  Inverters: number;
}

// Define a Mongoose schema for the line chart data (previously defined)
const DataPointSchema: Schema = new Schema({
  date: { type: String, required: true },
  SolarPanels: { type: Number, required: true },
  Inverters: { type: Number, required: true },
});

// Create a Mongoose model for the line chart data (previously defined)
export const DataPoint: Model<DataPoint> = mongoose.model<DataPoint>('DataPoint', DataPointSchema);

// Define an interface for the bar chart data structure
type BarChartData = Document & {
  name: string;
  'Number of threatened species': number;
}

// Create a Mongoose schema for the bar chart data
const BarChartSchema: Schema = new Schema({
  name: { type: String, required: true },
  'Number of threatened species': { type: Number, required: true },
});

// Create a Mongoose model for the bar chart data
export const BarChart: Model<BarChartData> = mongoose.model<BarChartData>('BarChart', BarChartSchema);

// Function to generate line chart data points (previously defined)
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
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  return data;
}

// Function to generate bar chart data
function generateBarChartData(): BarChartData[] {
  const categories = [
    'Amphibians', 'Birds', 'Crustaceans', 'Ferns', 'Arachnids', 'Corals', 'Algae',
    'Mammals', 'Reptiles', 'Fish', 'Insects', 'Molluscs', 'Plants', 'Mosses',
    'Lichens', 'Fungi', 'Conifers', 'Bats', 'Butterflies', 'Sharks', 'Rays',
    'Sea Turtles', 'Beetles', 'Dragonflies', 'Sea Snakes', 'Cacti', 'Orchids',
    'Frogs', 'Salamanders', 'Ants'
  ];

  const data: BarChartData[] = categories.map((category) => {
    return new BarChart({
      name: category,
      'Number of threatened species': faker.number.int({ min: 50, max: 6000 }),
    });
  });

  return data;
}

// Function to connect to MongoDB and save data
export async function saveData(): Promise<void> {
  try {
    // Connect to MongoDB
    await mongoose.connect(URL);
    console.log('Connected to MongoDB');

    // Generate and save line chart data points (previously defined)
    const lineChartData = generateDataPoints(50);
    await DataPoint.insertMany(lineChartData);
    console.log('Line chart data has been saved successfully');

    // Generate and save bar chart data
    const barChartData = generateBarChartData();
    await BarChart.insertMany(barChartData);
    console.log('Bar chart data has been saved successfully');

    console.log('Connection closed');
  } catch (err) {
    console.error('Error:', err);
  }
}
