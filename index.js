const defaultConfig = {
  baidu: { enable: true },
  bing: { enable: true },
  google: { enable: true }
}

hexo.config.hexo_seo_autopush = Object.assign(defaultConfig, hexo.config.hexo_seo_autopush)

hexo.extend.generator.register('BaiduSeoGenerator', require('./lib/baidu_generator'))
hexo.extend.generator.register('BingSeoGenerator', require('./lib/bing_generator'))
hexo.extend.generator.register('GoogleSeoGenerator', require('./lib/google_generator'))
hexo.extend.generator.register('GithubActionsHexoSeo', require('./lib/actions'))
