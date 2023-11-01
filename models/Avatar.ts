import { UUID, randomUUID } from 'crypto';
import { Document, Schema, model } from 'mongoose';

export interface AvatarInterface extends Document {
  id: UUID;
  link: UUID;
}

const AvatarSchema = new Schema({
  id: {
    type: Schema.Types.UUID,
    required: true,
    default: () => randomUUID(),
  },
  link: {
    type: String,
    required: true,
  },
});

export const Avatar = model<AvatarInterface>('Avatar', AvatarSchema, 'avatars');
