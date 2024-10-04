import mongoose from "mongoose";

const threadSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  text: { type: String, required: true }, parentId: { type: String },
  author: {
    type: mongoose.Schema.Types.ObjectId, ref: "User", required: true
  },
  group: { type: mongoose.Schema.Types.ObjectId, ref: "Group" },
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Thread" }]
});

const Thread = mongoose.models.Thread || mongoose.model("Thread", threadSchema);

export default Thread;
