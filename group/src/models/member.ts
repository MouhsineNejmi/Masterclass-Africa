import mongoose, { mongo } from 'mongoose';

interface MemberAttrs {
  userId: string;
  groupId: string;
}

interface MemberDoc extends mongoose.Document {
  userId: string;
  groupId: string;
}

interface MemberModel extends mongoose.Model<MemberDoc> {
  build(attrs: MemberAttrs): MemberDoc;
}

const membersSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    groupId: {
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

membersSchema.statics.build = (attrs: MemberAttrs) => {
  return new Member(attrs);
};

const Member = mongoose.model<MemberDoc, MemberModel>('Memeber', membersSchema);

export { Member };
