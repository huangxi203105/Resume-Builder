import mongoose from "mongoose";

const userSchema = new mongoose.Schema({ // 创建一个用户模型
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
},
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);