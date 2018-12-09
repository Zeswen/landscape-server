const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    email: String,
    password: String,
    imgUrl: {type: String, default: 'https://res.cloudinary.com/dk4iqakns/image/upload/v1544361952/landscape/profile.png' },
    pages: [
      { type: Schema.Types.ObjectId }
    ]
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
