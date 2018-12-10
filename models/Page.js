const mongoose = require("mongoose");
const { Schema } = mongoose;

const PageSchema = new Schema(
  {
    title: String,
    url: String,
    owner: Schema.Types.ObjectId,
    structure: {
      header: {
        title: String,
        position: {type: String, enum: ['left', 'center', 'right'] },
        hasMenu: Boolean,
        isReverse: Boolean,
        imgUrl: String,
        color: String,
        backgroundColor: String,
        font: String,
        fontSize: String
      },
      sections: [
        {
          title: String,
          position: {type: String, enum: ['left', 'center', 'right'] },
          description: String,
          imgUrl: String,
          color: String,
          backgroundColor: String,
          backgroundImg: String,
          font: String,
          fontSize: String
        }
      ],
      footer: {
        position: {type: String, enum: ['left', 'center', 'right'] },
        hasCopyright: Boolean,
        owner: String,
        social: [
          {
            name: String,
            url: String
          }
        ],
        color: String,
        backgroundColor: String,
        font: String,
        fontSize: String
      }
    },
    colors: {
      type: Array,
      default: ['#360568', '#5B2A86', '#7785AC', '#9AC6C5', '#A5E6BA', '#31263E', '#221E22', '#52528C', '#7C9EB2', '#CBC0AD']
    },
    fonts: {
      type: Array,
      default: ["Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", 'sans-serif']
    }
  }
);

const Page = mongoose.model("Page", PageSchema);
module.exports = Page;
