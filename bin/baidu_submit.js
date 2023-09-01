const axios = require('axios').default
const util = require('../utils/util')

module.exports = (options) => {
  console.info('Baidu submit, echo options: ', JSON.stringify(options, null, 2))
  try {
    const {baidu_token, proxy} = options
    // judge if use proxy to request the web interface
    if (proxy) {
      process.env.HTTPS_PROXY = proxy
      process.env.HTTP_PROXY = proxy
    }

    util.readCrawlerFileJSON()
      .then((data) => {
        const urlList = data.urlList
        const body = urlList.join('\n')
        // Use BingSubmitBatch interface to submit the latest urls.
        const options = {
          url: `http://data.zz.baidu.com/urls?site=${data.siteUrl}&token=${baidu_token}`,
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain'
          },
          data: body
        }
        // request baidu
        axios.post(options)
          .then(function (response) {
            console.log('Baidu response: ', response)
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


