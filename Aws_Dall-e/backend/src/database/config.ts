import mongoose, { Schema, Document } from 'mongoose'

const URL: string = '';

export const config = async (): Promise<void> => {
  try {
    await mongoose.connect(URL);
    console.log('Connected!');
  } catch (error) {
    console.error('Connection error:', error);
  }
};

export type User = Document & {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  favoriteSport: string
}

const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favoriteSport: { type: String, required: true }
});

export default mongoose.model<User>('User', UserSchema);