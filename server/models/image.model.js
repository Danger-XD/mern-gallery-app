import mongoose, { Schema } from "mongoose";

const dataSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    imageUrl: {
      type: String, //cloudinary url
      required: true,
    },
    publicId: {
      type: String, //cloudinary url
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
    visible: {
      type: String,
      enum: ["public", "private"],
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const imageModel = mongoose.model("Image", dataSchema);
export default imageModel;
