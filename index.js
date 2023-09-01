const defaultConfig = {
  
  baidu: { enable: true },
  bing: { enable: true },
  google: { enable: true }
}

hexo.config.hexo_seo_integrated_submit = Object.assign(defaultConfig, hexo.config.hexo_seo_integrated_submit)

hexo.extend.generator.register('CrawlerJsonGenerator', require('./lib/crawler_json_generator'))
hexo.extend.generator.register('GithubActionsHexoSeo', require('./lib/actions'))
