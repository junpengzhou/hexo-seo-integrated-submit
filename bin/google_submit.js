const axios = require('axios')
const { google } = require('googleapis')
const util = require('../utils/util')
module.exports = (options) => {
  try {
    const { client_email, private_key, proxy } = options
    // judge if use proxy to request the web interface
    if (proxy) {
      google.options({ proxy: proxy })
      process.env.HTTPS_PROXY = proxy
      process.env.HTTP_PROXY = proxy
    }
    const client_pri_key = private_key
      .replace(/^["|'](.*)["|']$/g, '')
      .replace(/(\\|\\\\)n/g, '\n')

    const jwtClient = new google.auth.JWT(
      client_email,
      null,
      client_pri_key,
      ['https://www.googleapis.com/auth/indexing'],
      null
    )

    jwtClient
      .authorize()
      .then((tokens) => {
        util.readCrawlerFileJSON()
          .then((data) => {
            const urlList = data.urlList
            const start = new Date().getTime()
            for (let i = 0; i < urlList.length; i++) {
              // request google
              axios({
                url: 'https://indexing.googleapis.com/v3/urlNotifications:publish',
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                auth: { bearer: tokens.access_token },
                data: {
                  url: urlList[i],
                  type: 'URL_UPDATED'
                }
              }).then(function (response) {
                console.log('status: %s, statusTxt: %s, response:%s', response.status, response.statusText, response.data)
              }).catch(function (error) {
                console.log(error);
              }).finally(function () {
                const end = new Date().getTime()
                console.log('it cost: %s', (end - start) + 'ms')
              })
            }
          })
          .catch((error) => console.error(error))
      })
      .catch((error) => console.error(error))
  } catch (error) {
    console.error(error)
  }
}
