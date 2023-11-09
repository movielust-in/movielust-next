import { Document, Model, Schema, model, models } from 'mongoose';
import { compare, hash } from 'bcrypt';

export interface UserInterface extends Document {
  name: string;
  password: string;
  email: string;
  image: string;
  verified: boolean;
  created_at: Date;
  logins: [Date];
  visits: [Date];
  watchlist: [{ content_id: string; type: string; created_at: Date }];
  watched: [
    { content_id: string; type: string; created_at: Date; name: string }
  ];
}

const CONTENT_TYPE = ['movie', 'tv'];

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    email: {
      type: String,
      required: true,
      set: (e: string) => e.toLowerCase(),
    },
    image: {
      type: String,
      default: '',
      required: true,
    },
    verified: {
      type: Boolean,
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    logins: [
      {
        type: Date,
      },
    ],
    watchlist: [
      {
        content_id: { type: String, required: true },
        type: { type: String, enum: CONTENT_TYPE, required: true },
        created_at: { type: Date, default: Date.now },
      },
    ],
    visits: [
      {
        type: Date,
      },
    ],
    watched: [
      {
        content_id: { type: String, required: true },
        type: { type: String, enum: CONTENT_TYPE, required: true },
        created_at: { type: Date, default: Date.now },
        name: { type: String },
        season: { type: Number },
        episode: { type: Number },
      },
    ],
  },
  {
    methods: {
      async comparePassword(password) {
        const match = await compare(password, this.password);
        if (match) return true;
        return false;
      },
    },
  }
);

// eslint-disable-next-line prefer-arrow-callback
UserSchema.pre('save', async function hashPasswordBeforSaving() {
  const { password } = this;
  const hashedPassword = await hash(password, 10);
  this.set('password', hashedPassword);
});

export const User: Model<UserInterface> =
  models.User || model<UserInterface>('User', UserSchema, 'user');
