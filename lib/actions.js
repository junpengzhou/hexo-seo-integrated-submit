module.exports = function () {
  // 获取配置信息
  const config = this.config.hexo_seo_autopush
  if (!config) {
    console.warn('未在hexo的_config.yml配置hexo_seo_autopush,请参考官方文档进行配置，文档见：https://github.com/junpengzhou/hexo-seo-integrated-submit')
    return;
  }
  // 如果不生成workflow文件
  const generate_workflow_file_flag = config.generate_workflow_file === 'undefined' ? true : config.generate_workflow_file
  if (!generate_workflow_file_flag) {
    return;
  }
  // yml生成路径
  const yml_path = config.file_path ? config.file_path : '.github/workflows/seo.yml'
  // 执行周期(如果没有配置则为12点进行执行)
  const cron = config.cron || '0 4 * * *'
  // 博客地址获取
  const config_url = this.config.url // 获取博客地址||注：我并没有使用for_url()方法(Hexo5.0后没有root了)

  // google 执行脚本
  const google_run_shell = 'npx hexoautopush "${{secrets.google_client_email}}" "${{secrets.google_private_key}}"'
  // bing
  const bing_run_shell = 'curl -X POST "https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlBatch?apikey=${{secrets.bing_apikey}}" -H "Content-Type:application/json" -H "charset:utf-8" -d @bing.json'
  // baidu
  const baidu_run_shell = 'curl -H "Content-Type:text/plain" --data-binary @baidu.txt "http://data.zz.baidu.com/urls?site=' + config_url + '&token=${{secrets.baidu_token}}"'

  return {
    path: yml_path,
    data: `
name: Hexo SEO Auto Push

on:
  schedule:
    - cron: ${cron}
  watch:
    types: [started]
jobs:
  build:
    runs-on: ubuntu-latest
    if: github.event.repository.owner.id == github.event.sender.id || github.event_name == 'schedule'
    steps:

      - name: 1. 检查url文件
        uses: actions/checkout@v3

      - name: 2. 安装 Node
        uses: actions/setup-node@v3
        with:
          node-version: 16

      - name: 3. 安装插件
        run: |
          npm init -y
          npm install hexo-seo-autopush

      - name: 4. google 提交
        if: ${config.google.enable ? 'true' : 'false'}
        run: ${google_run_shell}

      - name: 5. bing 提交
        if: ${config.bing.enable ? 'true' : 'false'}
        run: ${bing_run_shell}

      - name: 6. baidu 提交
        if: ${config.baidu.enable ? 'true' : 'false'}
        run: ${baidu_run_shell}
`
  }
}
