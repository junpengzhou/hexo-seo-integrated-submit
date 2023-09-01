const axios = require('axios')
const util = require('../utils/util')

module.exports = (options) => {
  try {
    const { apikey, proxy } = options
    // judge if use proxy to request the web interface
    if (proxy) {
      process.env.HTTPS_PROXY = proxy
      process.env.HTTP_PROXY = proxy
    }

    util.readCrawlerFileJSON()
      .then((data) => {
        // Use BingSubmitBatch interface to submit the latest urls.
        // request bing
        const start = new Date().getTime()
        axios({
          url: `https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlBatch?apikey=${apikey}`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'charset': 'utf-8'
          },
          data: {
            siteUrl: data.siteUrl,
            urlList: data.urlList
          }
        }).then(function (response) {
          console.log('status: %s, statusTxt: %s, response:%s, cost:%s', response.status, response.statusText, response.data)
        }).catch(function (error) {
          console.log(error);
        }).finally(function () {
          const end = new Date().getTime()
          console.log('it cost: %s', (end - start) + 'ms')
        })
      })
      .catch((error) => console.error(error))
  } catch (error) {
    console.error(error)
  }
}