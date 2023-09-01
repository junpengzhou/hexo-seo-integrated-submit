const axios = require('axios').default
const util = require('../utils/util')
const { join } = require('path')

module.exports = (options) => {
  console.info('Bing submit, echo options: \n', JSON.stringify(options, null, 2))
  try {
    const { apikey, proxy } = options
    // judge if use proxy to request the web interface
    if (proxy) {
      process.env.HTTPS_PROXY = proxy
      process.env.HTTP_PROXY = proxy
    }
    const urls_file = join(process.cwd(), 'crawler.json')

    util.readCrawlerFileJSON(urls_file)
      .then((data) => {
        if (!data) {
          console.log('No have any data to submit,finish!')
          return
        }
        const urlList = data.urlList
        if (!urlList || urlList.length === 0) {
          console.log('No have any data to submit,finish!')
          return
        }
        // Use BingSubmitBatch interface to submit the latest urls.
        const options = {
          url: `https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlBatch?apikey=${apikey}`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'charset': 'utf-8'
          },
          data: data
        }
        // request bing
        axios.post(options)
          .then(function (response) {
            console.log('Bing response: ', response)
          })
          .catch(function (error) {
            console.log(error);
          })
          .finally(function () {
            console.log('finish request!')
          })
      })
      .catch((error) => console.error(error))
  } catch (error) {
    console.error(error)
  }
}