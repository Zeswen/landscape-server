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
        height: String,
        paddingV: String,
        paddingH: String,
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
          paddingV: String,
          paddingH: String,
          textAlign: {type: String, enum: ['left', 'center', 'right', 'justify'] },
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
        owner: String,
        backgroundColor: String,
        position: {type: String, enum: ['top', 'center', 'bottom'] },
        height: String,
        paddingV: String,
        paddingH: String,
        isReverse: Boolean,
        hasCopyright: Boolean,
        copyrightFontFamily: String,
        copyrightFontSize: String,
        copyrightColor: String,
        ownerFontFamily: String,
        ownerFontSize: String,
        ownerColor:String,
        social: [
          {
            name: {type: String, enum: ['Facebook', 'Twitter', 'Instagram']},
            url: String
          }
        ],
        position: {type: String, enum: ['left', 'center', 'right', 'spaced'] },
        fontFamily: String,
        fontSize: String,
        color: String,
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
