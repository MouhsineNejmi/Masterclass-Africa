import mongoose from 'mongoose';

enum GROUP_PRIVACY {
  PRIVATE,
  PUBLIC,
}

interface GroupAttrs {
  name: string;
  category: string;
  thumbnail?: string;
  description?: string;
  gallery: string[];
  jsonDescription?: string;
  htmlDescription?: string;
  icon?: string;
  privacy: GROUP_PRIVACY;
  active: boolean;
  userId: string;
}

interface GroupDoc extends mongoose.Document {
  name: string;
  category: string;
  thumbnail?: string;
  description?: string;
  gallery: string[];
  jsonDescription?: string;
  htmlDescription?: string;
  icon?: string;
  privacy: GROUP_PRIVACY;
  active: boolean;
  userId: string;
}

interface GroupModel extends mongoose.Model<GroupDoc> {
  build(attrs: GroupAttrs): GroupDoc;
}

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
    },
    description: {
      type: String,
    },
    gallery: {
      type: Array<String>,
      required: true,
    },
    jsonDescription: {
      type: String,
    },
    htmlDescription: {
      type: String,
    },
    icon: {
      type: String,
    },
    privacy: {
      type: String,
      enum: ['PRIVATE', 'PUBLIC'],
      default: 'PRIVATE',
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
    versionKey: false,
  }
);

groupSchema.statics.build = (attrs: GroupAttrs) => {
  return new Group(attrs);
};

const Group = mongoose.model<GroupDoc, GroupModel>('Group', groupSchema);

export { Group };
