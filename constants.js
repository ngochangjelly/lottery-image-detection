module.exports = {
  LOTTERY_SERIE_LENGTH: 6,
  LOCAL_PORT: 3000,
  KQXS_ORIGIN: "https://minhngoc.net.vn/getkqxs/da-nang.js",
  FINAL_PROCESSED_IMG_FOLDER: __dirname + "/final-processed",
  EXTRACTED_SERIE_FOLDER: __dirname + "/extracted-serie-number",
  TESSERACT_OPTION: {
    lang: 'eng',
    tessedit_char_whitelist: '0123456789'
  }
}