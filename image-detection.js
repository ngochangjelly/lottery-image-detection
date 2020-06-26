const { createWorker } = require('tesseract.js')
const cropLottery = require('./crop-image')
const Jimp = require('jimp');

const constants = require('./constants')
const { FINAL_PROCESSED_IMG_FOLDER, EXTRACTED_SERIE_FOLDER } = constants

async function convertToGrayScale(folder, image) {
  Jimp.read(`${folder}/${image}`, (err, lenna) => {
    if (err) throw err;
    lenna
      .greyscale()
      .contrast(1)
      .quality(100)
      .write(`${FINAL_PROCESSED_IMG_FOLDER}/${image}`); // save
  });
}
module.exports = async function () {
  const worker = createWorker()
  try {
    await worker.load('./final-processed')
    await worker.loadLanguage('eng')
    await worker.initialize('eng')
    // Here's a simple preprocessing step to clean up the image before using pytesseract
    // Convert image to grayscale
    // Sharpen the image
    // Perform morphological transformations to enhance text

    const originalImage = '9.png'
    await cropLottery(originalImage)
    await convertToGrayScale(`${EXTRACTED_SERIE_FOLDER}`, originalImage)
    const { data: { text } } = await worker.recognize(originalImage, 'eng', {
      logger: m => console.log(m)
    })
    await worker.terminate()
    return text
  } catch (error) {
    console.error(error)
  }
}
