const urlsFn = require('../utils/urls')

module.exports = function (locals) {
  // get the config
  const config = this.config.hexo_seo_integrated_submit
  const siteUrl = this.config.url
  // get urls by hexo post modules interface
  const urls = urlsFn(locals, config.count, config.date)
  // generate crawler json
  const crawler_json =  Object.assign(config, { siteUrl: siteUrl, urlList: urls.split('\n') })
  // return data to generate the crawler.json file
  console.log('\x1B[32m%s\x1B[0m  Generated: \x1B[35m%s\x1B[0m', 'INFO', 'crawler.json')
  return { path: 'crawler.json', data: JSON.stringify(crawler_json) }
}
