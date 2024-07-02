import mongoose, { Document, Schema } from "mongoose";

export interface Message extends Document {
  content: string;
  createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
  },
  createdAt: Date,
});

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: true;
  isAcceptingMessages: true;
  message: Message[];
}

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "Email is required"],
    // match: [
    //   /^(([^<>()[\\]\\\\.,;:\\s@\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\"]+)*)|.(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$/,
    //   "Enter valid Email Address",
    // ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  VerifyCode: {
    type: String,
    // required: [true, "VerifyCode is required"],
  }, 
  VerifyCodeExpiry: {
    type: Date,
    // required: [true, "VerifyCode is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAcceptingMessages: {
    type: Boolean,
    default: true,
  },
  message: [MessageSchema],
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);
export default UserModel; 
