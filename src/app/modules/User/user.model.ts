import { Schema, model } from 'mongoose';
import { userRole } from './user.constant';
import { TPasswordHistory, TUserRegister } from '../Auth/auth.interface';

const passwordHistorySchema = new Schema<TPasswordHistory>(
  {
    password: {
      type: String,
      required: true,
    },
    changedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: false,
  },
);

const userSchema = new Schema<TUserRegister>(
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
      enum: userRole,
      default: 'user',
    },
    passwordHistory: {
      type: [passwordHistorySchema],
      select: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.methods.toJOSN = function () {
  const user = this.user;
  const userObj = user.toObject();
  delete userObj.password;
  return userObj;
};

export const User = model<TUserRegister>('User', userSchema);
