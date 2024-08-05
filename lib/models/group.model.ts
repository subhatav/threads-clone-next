import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  id: { type: String, required: true }, bio: String,
  username: { type: String, unique: true, required: true },
  name: { type: String, required: true }, image: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  threads: [{ type: mongoose.Schema.Types.ObjectId, ref: "Thread" }],
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

const Group = mongoose.models.Group || mongoose.model("Group", groupSchema);

export default Group;
