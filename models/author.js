import mongoose from "mongoose";

const authorsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

export const Author = mongoose.model("Author", authorsSchema);
