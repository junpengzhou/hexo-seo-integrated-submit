
const fs = require('fs');

// read the crawler.json file to json object
function readCrawlerFileJSON(fReadName) {
  return new Promise((resolve, reject) => {
    try {
      fs.readFile(fReadName, 'utf8', (error, data) => {
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