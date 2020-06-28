const { createWorker } = require('tesseract.js')
const Jimp = require('jimp');

const constants = require('./constants')
const { FINAL_PROCESSED_IMG_FOLDER, TESSERACT_OPTION } = constants

async function convertToGrayScale(image) {
  const processImage = await Jimp.read(`${image}`)
  try {
    await processImage.greyscale()
    await processImage.contrast(1)
    await processImage.quality(100)
    await processImage.writeAsync(`${FINAL_PROCESSED_IMG_FOLDER}/${image}`);
    console.log('finish convert image grayscale!')
    await processImage.
      return
  } catch (error) {
    console.log("convertToGrayScale -> error", error)
  }
  return
}
module.exports = async function () {
  const worker = createWorker()
  try {
    await worker.load()
    await worker.loadLanguage('eng')
    await worker.initialize('eng')
    // Here's a simple preprocessing step to clean up the image before using pytesseract
    // Convert image to grayscale
    // Sharpen the image
    // Perform morphological transformations to enhance text

    const originalImage = "9.png"
    await convertToGrayScale(originalImage)
    const { data: { text } } = await worker.recognize(`${FINAL_PROCESSED_IMG_FOLDER}/${originalImage}`, TESSERACT_OPTION, {
      logger: m => console.log(m)
    })
    await worker.terminate()
    return text
  } catch (error) {
    console.error(`error: `, error)
  }
}
