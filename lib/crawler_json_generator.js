const urlsFn = require('../utils/urls')

module.exports = function (locals) {
  // get the config
  const config = this.config.hexo_seo_integrated_submit
  // if non config, break!
  if (!config.date && !config.count) return
  // get urls by hexo post modules interface
  const urls = urlsFn(locals, config.count, config.date)
  // generate crawler json
  const crawler_json =  Object.assign(config, { siteUrl: this.config.url, urlList: urls.split('\n') })
  // return data to generate the crawler.json file
  return { path: 'crawler.json', data: JSON.stringify(crawler_json) }
}
