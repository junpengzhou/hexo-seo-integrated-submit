module.exports = function () {
  // get the config of hexo_seo_integrated_submit
  const config = this.config.hexo_seo_integrated_submit
  const generate_workflow_file_flag = config.generate_workflow_file === 'undefined' ? true : config.generate_workflow_file
  if (!generate_workflow_file_flag) {
    return;
  }
  // yaml generate target path
  const yml_path = config.file_path ? config.file_path : '.github/workflows/seo.yml'
  // schedule cron
  const cron = config.cron || '0 4 * * *'
  const google_run_shell = 'hexo-sis google -e "${{secrets.google_client_email}}" -k "${{secrets.google_private_key}}"'
  const bing_run_shell = 'hexo-sis bing -k "${{secrets.bing_apikey}}"'
  const baidu_run_shell = 'hexo-sis baidu -k "${{secrets.baidu_token}}"'

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

      - name: 1. Checkout the code
        uses: actions/checkout@v3

      - name: 2. Install Node Environment
        uses: actions/setup-node@v3
        with:
          node-version: 16

      - name: 3. Install the Plugin of 
        run: |
          npm install hexo-seo-integrated-submit -g

      - name: 4. Google submit
        if: ${config.google.enable ? 'true' : 'false'}
        run: ${google_run_shell}

      - name: 5. Bing submit
        if: ${config.bing.enable ? 'true' : 'false'}
        run: ${bing_run_shell}

      - name: 6. Baidu submit
        if: ${config.baidu.enable ? 'true' : 'false'}
        run: ${baidu_run_shell}
`
  }
}
