import mongoose from 'mongoose';
import { Password } from '../services/password';

// Properties that are required to create new user
interface UserAttrs {
  email: string;
  password: string;
}

// Properties that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): any;
}

// Properties that a User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
      },
      versionKey: false,
    },
  }
);

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashedPassword = await Password.hash(this.get('password'));
    this.set('password', hashedPassword);
  }
  done();
});

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
