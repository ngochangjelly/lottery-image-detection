const { uuid } = require('uuidv4')
const fs = require('fs');
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();
const deleteFolderRecursive = require('./utils/deleteFolderRecursive.js')
const regex = require('./regex');
const constant = require('./constants')

const axios = require("axios")
const cheerio = require("cheerio")

async function fetchHTML(url) {
  const { data } = await axios.get(url)
  return cheerio.load(data)
}

async function writeImageBuffer(dir, image) {
  imgBuffer = Buffer.from(image.split(';base64,').pop(), 'base64')
  const fileName = uuid() + '.png';
  fs.writeFileSync(`${dir}/${fileName}`, imgBuffer);
  return fileName
};

async function detect(fileName) {
  let date, serie, province
  const [result] = await client.textDetection(fileName);
  const detections = result.textAnnotations;
  const detectionsTextArr = detections.map(text => text.description)
  const detectionsText = detectionsTextArr.join(' ')
  // console.log(detectionsText)
  constant.provinceCode.forEach(function (value, key) {
    if (detectionsText.toLocaleLowerCase().includes(key.toLowerCase())) {
      province = constant.provinceXs.get(value)
    }
  })
  detections.forEach(text => {
    const desc = text.description
    if (desc.match(regex.date)) {
      date = desc
    }
    if (desc.match(regex.digits6)) {
      serie = desc
    }
  });
  return { date, serie, province }
}

module.exports = async function (image) {
  const dir = 'tmp-' + uuid();
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  try {
    console.log('ccccccccccccc')
    const fileName = await writeImageBuffer(dir, image)
    const data = await detect(`${dir}/${fileName}`);
    const { serie, date, province } = data
    if (!date || !province) {
      return { message: 'better luck next time' }
    }
    const url = constant.API_ENDPOINT + province + '.html'
    const $ = await fetchHTML(url)
    console.log('ccccccccccccc')
    const prizes = $('table[class="table-result"]').find('tr>td').toArray().map(element => $(element).text());
    const trimmedPrizes = prizes.map(item => item.replace(/(^\s+|\s+$)/g, ' '))
    let sortedPrizes = new Map([])
    trimmedPrizes.forEach((value, index) => {
      if (index % 2 === 0 && index !== trimmedPrizes.length - 1) {
        sortedPrizes[value] = trimmedPrizes[index + 1]
      }
    })
    let result
    if (serie) {
      for (const [key, value] of Object.entries(sortedPrizes)) {
        if (value.includes(serie)) {
          result = key
        }
      }
    }
    console.log('ccccccccccccc')
    deleteFolderRecursive(dir)
    console.log('ccccccccccccc')
    if (result) {
      return { message: 'better luck next time', prizes: sortedPrizes, wonPrize: value, province, serie, date }
    } else {
      return { message: 'better luck next time', prizes: sortedPrizes, province, serie, date }
    }
  } catch (error) {
    console.error(`error: `, error)
    throw new Error(error)
  }
}
