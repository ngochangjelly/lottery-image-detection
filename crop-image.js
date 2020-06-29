const sharp = require('sharp');
const sizeOf = require('image-size');
const fs = require('fs');
const { uuid } = require('uuidv4');

const percentFromTop = 70 / 100
const percentFromLeft = 30 / 100

module.exports = async (dir, image) => {
  imgBuffer = Buffer.from(image.split(';base64,').pop(), 'base64')
  const fileName = uuid() + '.png'
  fs.writeFileSync(`${dir}/${fileName}`, imgBuffer)
  const imageDimensions = sizeOf(`${dir}/${fileName}`);
  const { width, height } = imageDimensions

  const croppedWidth = parseInt(width * (1 - percentFromLeft))
  const croppedHeight = parseInt(height * (1 - percentFromTop))
  const croppedLeft = parseInt(percentFromLeft * width)
  const croppedTop = parseInt(percentFromTop * height)
  const finalFileName = uuid() + '.png'

  await sharp(`${dir}/${fileName}`).extract({ width: croppedWidth, height: croppedHeight, left: croppedLeft, top: croppedTop }).toFile(`${dir}/${finalFileName}`)
  return finalFileName
};