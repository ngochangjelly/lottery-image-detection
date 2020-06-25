const im = require('imagemagick');
const sharp = require('sharp');
const sizeOf = require('image-size');
// import { LOTTER_SERIE_LENGTH } from './constants'

const percentFromTop = 70 / 100
const percentFromLeft = 30 / 100

module.exports = (originalImage) => {
  const originalImageDimensions = sizeOf(originalImage);
  const { width, height } = originalImageDimensions
  let outputImage = `extracted-images/${originalImage}`;
  const croppedWidth = parseInt(width * (1 - percentFromLeft))
  const croppedHeight = parseInt(height * (1 - percentFromTop))
  const croppedLeft = parseInt(percentFromLeft * width)
  const croppedTop = parseInt(percentFromTop * height)

  sharp(originalImage).extract({ width: croppedWidth, height: croppedHeight, left: croppedLeft, top: croppedTop }).toFile(outputImage)
    .then(function (new_file_info) {
      console.log("Image cropped and saved");
      return outputImage;
    })
    .catch(function (err) {
      console.log("​err", err)
      return null
    });
};