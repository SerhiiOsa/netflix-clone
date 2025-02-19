import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      minLength: 6,
    },
    image: {
      type: String,
      default: '',
    },
    searchHistory: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
