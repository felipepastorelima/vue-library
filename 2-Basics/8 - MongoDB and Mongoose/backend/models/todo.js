const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 255
    }
  },
  { timestamps: true }
);

TodoSchema.virtual("id").get(function() {
  return this._id.toHexString();
});

TodoSchema.set("toJSON", {
  getters: true
});

TodoSchema.set("toObject", {
  getters: true
});

const Todo = mongoose.model("todo", TodoSchema);

module.exports = Todo;
