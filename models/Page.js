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
        imgUrl: String,
        backgroundColor: String,
        position: {type: String, enum: ['left', 'center', 'right'] },
        padding: String,
        hasMenu: Boolean,
        menuSize: String,
        isReverse: Boolean,
        fontFamily: String,
        fontSize: String,
        color: String,
      },
      sections: [
        {
          id: String,
          title: String,
          description: String,
          imgUrl: String,
          backgroundImg: String,
          backgroundColor: String,
          position: {type: String, enum: ['top', 'center', 'bottom'] },
          height: String,
          textAlign: {type: String, enum: ['left', 'center', 'right', 'justify'] },
          padding: String,
          isReverse: String,
          titleFontFamily: String,
          titleFontSize: String,
          titleColor: String,
          descriptionFontFamily: String,
          descriptionFontSize: String,
          descriptionColor: String,
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
        fontFamily: String,
        fontSize: String
      }
    },
    fonts: {
      type: Array,
      default: ["Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", 'sans-serif']
    }
  }
);

const Page = mongoose.model("Page", PageSchema);
module.exports = Page;
