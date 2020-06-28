const sharp = require('sharp');
const sizeOf = require('image-size');
const constants = require('./constants')
const { EXTRACTED_SERIE_FOLDER } = constants

const percentFromTop = 70 / 100
const percentFromLeft = 30 / 100

module.exports = (image) => {
  const imageDimensions = sizeOf(image);
  const { width, height } = imageDimensions
  let outputImage = `${EXTRACTED_SERIE_FOLDER}/${image}`;
  const croppedWidth = parseInt(width * (1 - percentFromLeft))
  const croppedHeight = parseInt(height * (1 - percentFromTop))
  const croppedLeft = parseInt(percentFromLeft * width)
  const croppedTop = parseInt(percentFromTop * height)

  sharp(image).extract({ width: croppedWidth, height: croppedHeight, left: croppedLeft, top: croppedTop }).toFile(outputImage)
    .then(function (new_file_info) {
      console.log("Image cropped and saved");
      return;
    })
    .catch(function (err) {
      console.log("​err", err)
      return null
    });
};