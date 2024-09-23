import mongoose from 'mongoose'

// Define the schema for the 'users' collection
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
})

// Create a model for the 'users' collection
export default mongoose.model('User', userSchema);