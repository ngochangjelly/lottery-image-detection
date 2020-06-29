const { createWorker } = require('tesseract.js')
const Jimp = require('jimp');
const { uuid } = require('uuidv4')
const constants = require('./constants');
const { TESSERACT_OPTION } = constants
const cropImage = require('./crop-image')
const fs = require('fs');

async function convertToGrayScale(dir, image) {
  const processImage = await Jimp.read(`${dir}/${image}`)
  try {
    await processImage.greyscale()
    await processImage.contrast(1)
    await processImage.quality(100)
    const fileName = uuid() + '.png'
    await processImage.writeAsync(`${dir}/${fileName}`)
    return fileName
  } catch (error) {
    console.log("error during convert gray scale", error)
  }
  return
}
module.exports = async function (image) {
  const dir = 'tmp-' + uuid();

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  const worker = createWorker()
  try {
    await worker.load()
    await worker.loadLanguage('eng')
    await worker.initialize('eng')
    // Here's a simple preprocessing step to clean up the image before using pytesseract
    // Convert image to grayscale
    // Sharpen the image
    // Perform morphological transformations to enhance text
    const croppedImage = await cropImage(dir, image)

    const grayImage = await convertToGrayScale(dir, croppedImage)
    const { data: { text } } = await worker.recognize(`${dir}/${grayImage}`, TESSERACT_OPTION, {
      logger: m => console.log(m)
    })
    await worker.terminate()
    return text
  } catch (error) {
    console.error(`error: `, error)
  }
}
