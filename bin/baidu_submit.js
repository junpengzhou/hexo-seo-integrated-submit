const axios = require('axios')
const util = require('../utils/util')

module.exports = (options) => {
  try {
    const { baidu_token, proxy } = options
    // judge if use proxy to request the web interface
    if (proxy) {
      console.log('config with proxy:', proxy)
      process.env.HTTPS_PROXY = proxy
      process.env.HTTP_PROXY = proxy
    }

    util.readCrawlerFileJSON()
      .then((data) => {
        const urlList = data.urlList
        const body = urlList.join('\n')
        // Use BingSubmitBatch interface to submit the latest urls.
        // request baidu
        const start = new Date().getTime()
        axios({
          url: `http://data.zz.baidu.com/urls?site=${data.siteUrl}&token=${baidu_token}`,
          method: 'post',
          headers: {
            'Content-Type': 'text/plain'
          },
          data: body
        }).then(function (response) {
          console.log('status: %s, statusTxt: %s, response:%s', response.status, response.statusText, response.data)
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


