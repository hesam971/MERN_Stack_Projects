// create_table.js
import mongoose, { Schema, Document } from "mongoose"
const faker = require('faker');

type FakeInformation = Document & {
    name: string;
    email: string;
    address: string;
  }
  
  // Connect to MongoDB
  mongoose
    .connect(
      "")
    .then(() => {
      console.log("Connected to MongoDB!");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
  
  // Define schemas and models
  const fetchApiSchema: Schema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
  });
  
  export const FetchApi = mongoose.model<FakeInformation>("FetchApi", fetchApiSchema);
  
  // Function to generate fake data
  export const generateFakeData =  async () => {
    try {
      await mongoose.connection.dropDatabase();
  
      const fakeData: FakeInformation[] = [];
  
      for (let i = 0; i < 50; i++) {
        fakeData.push(
          new FetchApi({
            name: faker.name.findName(),
            email: faker.internet.email(),
            address: faker.address.streetAddress(),
          })
        );
      }
  
      await FetchApi.insertMany(fakeData);
  
      console.log("Tables created");
    } catch (error) {
      console.error("Error generating fake data:", error);
    }
  }
