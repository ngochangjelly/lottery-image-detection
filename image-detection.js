const { createWorker } = require('tesseract.js')
const cropLottery = require('./crop-image')

module.exports = async function () {
  const worker = createWorker()
  try {
    await worker.load()
    await worker.loadLanguage('eng')
    await worker.initialize('eng')
    await worker.loadLanguage('vie')
    await worker.initialize('vie')
    const originalImage = '9.png'
    await cropLottery(originalImage)
    const { data: { text } } = await worker.recognize('extracted-images/9.jpg', 'eng', {
      logger: m => console.log(m)
    })
    // const { data: { text } } = await worker.recognize('https://tesseract.projectnaptha.com/img/eng_bw.png')
    console.log("text", text)
    await worker.terminate()
    return text
  } catch (err) {
    console.log("​}catch -> err", err)
  }
}