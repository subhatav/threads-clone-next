import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: { type: String, required: true }, bio: String,
  username: { type: String, unique: true, required: true },
  name: { type: String, required: true }, image: String,
  onboarded: { type: Boolean, default: false },
  threads: [{ type: mongoose.Schema.Types.ObjectId, ref: "Thread" }],
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group" }]
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
