import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import { USER_ROLE } from './user.constant';

const userSchema = new Schema<TUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      enum: USER_ROLE,
      default: 'user',
    },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.toJOSN = function () {
  const user = this.user;
  const userObj = user.toObject();
  delete userObj.password;
  return userObj;
};

export const User = model<TUser>('User', userSchema);
