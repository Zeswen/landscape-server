const mongoose = require("mongoose");
const { Schema } = mongoose;

const PageSchema = new Schema(
  {
    title: String,
    url: {type: String, unique: true},
    owner: Schema.Types.ObjectId,
    structure: {
      header: {
        title: String,
        imgUrl: String,
        backgroundColor: String,
        backgroundAlpha: String,
        position: {type: String, enum: ['left', 'center', 'right'] },
        height: String,
        paddingV: String,
        paddingH: String,
        hasMenu: Boolean,
        menuSize: String,
        menuBackground: String,
        isReverse: Boolean,
        fontFamily: String,
        fontSize: String,
        color: String,
        alpha: String,
      },
      sections: [
        {
          id: String,
          title: String,
          description: String,
          backgroundImg: String,
          backgroundColor: String,
          backgroundAlpha: String,
          position: {type: String, enum: ['top', 'center', 'bottom'] },
          height: String,
          paddingV: String,
          paddingH: String,
          textAlign: {type: String, enum: ['left', 'center', 'right', 'justify'] },
          isReverse: String,
          titleFontFamily: String,
          titleFontSize: String,
          titleColor: String,
          titleAlpha: String,
          descriptionFontFamily: String,
          descriptionFontSize: String,
          descriptionColor: String,
          descriptionAlpha: String,
        }
      ],
      footer: {
        backgroundColor: String,
        backgroundAlpha: String,
        position: {type: String, enum: ['top', 'center', 'bottom', 'auto'] },
        height: String,
        paddingV: String,
        paddingH: String,
        isReverse: Boolean,
        hasCopyright: Boolean,
        copyrightText: String,
        copyrightFontFamily: String,
        copyrightFontSize: String,
        copyrightColor: String,
        copyrightAlpha: String,
        ownerText: String,
        ownerFontFamily: String,
        ownerFontSize: String,
        ownerColor: String,
        ownerAlpha: String,
        social: [
          {
            active: Boolean,
            name: {type: String, enum: ['Facebook', 'Twitter', 'Instagram']},
            url: String
          }
        ],
        socialPosition: {type: String, enum: ['left', 'center', 'right', 'spaced'] },
        fontFamily: String,
        fontSize: String,
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
