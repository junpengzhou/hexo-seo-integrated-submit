
const fs = require('fs')
const { join } = require('path')

// read the crawler.json file to json object
function readCrawlerFileJSON() {
  return new Promise((resolve, reject) => {
    try {
      // find the crawler file path
      const file_path = scanCrawlerFilePath()
      // read the crawler.json file
      fs.readFile(file_path, 'utf8', (error, data) => {
        if (error) {
          return reject(error)
        }
        if (!data) {
          return reject('Has no data to submit, exit!')
        }
        const jsonData = JSON.parse(data)
        const urlList = jsonData.urlList || []
        if (urlList.length === 0) {
          return reject('Has no urlList to submit, exit!')
        }
        return resolve(jsonData)
      })
    } catch (error) {
      return reject(error)
    }
  })
}

function scanCrawlerFilePath() {
  const file_path_one = 'crawler.json'
  const file_path_two = 'public/crawler.json'
  let file_path
  // scan the public and root dir to find the crawler.json
  try {
    fs.accessSync(file_path_one, fs.constants.F_OK)
    return file_path = join(process.cwd(), file_path_one)
  } catch (err) {
    try {
      fs.accessSync(file_path_two, fs.constants.F_OK)
      return file_path = join(process.cwd(), file_path_two)
    } catch (err) {
      throw err
    }
  }
}

module.exports = {
  readCrawlerFileJSON
}