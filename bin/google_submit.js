const axios = require('axios').default
const { google } = require('googleapis')
const util = require('../utils/util')
module.exports = (options) => {
  console.info('Google submit, echo options: ', JSON.stringify(options, null, 2))
  try {
    const {client_email, private_key, proxy} = options
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
            if (!data) {
              console.log('No have any data to submit,finish!')
              return
            }
            const urlList = data.urlList
            if (!urlList) {
              console.log('No have any data to submit,finish!')
              return
            }
            for (let i = 0; i < urlList.length; i++) {
              const options = {
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
              }
              // request google
              axios.post(options)
                .then(function (response) {
                  console.log('Google response: ', response)
                })
                .catch(function (error) {
                  console.log(error);
                })
                .finally(function () {
                  console.log('finish request!')
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
