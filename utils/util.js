
const fs = require('fs')
const { join } = require('path')

// read the crawler.json file to json object
function readCrawlerFileJSON() {
  return new Promise((resolve, reject) => {
    try {
      // get crawler.json's absolute path
      const file_json = join(process.cwd(), 'crawler.json')
      // read the crawler.json file
      fs.readFile(file_json, 'utf8', (error, data) => {
        if (error) {
          return reject(error)
        }
        if (!data) {
          return reject('Has no data to submit, exit!')
        }
        const urlList = data.urlList
        if (!urlList || new Array(urlList).length === 0) {
          return reject('Has no urlList to submit, exit!')
        }
        return resolve(data)
      })
    } catch (error) {
      return reject(error)
    }
  })
}

module.exports = {
  readCrawlerFileJSON
}