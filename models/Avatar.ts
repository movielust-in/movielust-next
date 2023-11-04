import { UUID } from 'crypto';

import { Document, Schema, model, models } from 'mongoose';

export interface AvatarInterface extends Document {
  link: UUID;
}

const AvatarSchema = new Schema({
  link: {
    type: String,
    required: true,
  },
});

export const Avatar =
  models.Avatar || model<AvatarInterface>('Avatar', AvatarSchema, 'avatars');
