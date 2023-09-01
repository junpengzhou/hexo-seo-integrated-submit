#!/usr/bin/env node
const yargs = require('yargs')
const google_submit = require('./google_submit')
const bing_submit = require('./bing_submit')
const baidu_submit = require('./baidu_submit')

yargs
    .scriptName("hexo-sis")
    .usage('Useage: $0 <command> [options]')
    .command('google', 'Submit crawler data to Google Search Engine', (yargs) => {
        yargs.option('email', {
            type: 'string',
            alias: 'e',
            description: 'The Email is your acount\'s username to login Google Search Console',
        }).option('key', {
            type: 'string',
            alias: 'k',
            description: 'Your Google client private key',
        }).demandOption(['email', 'key'], '\x1B[31mPlease provide both email and key arguments to work with google submit!\x1B[0m')
            .example('$0 google --email xxx --key xxx', 'Submit to Google')
            .example('$0 google -e xxx -k xxx', 'Simplely Submit to Google')
    }, function (argv) {
        // begin google submit
        google_submit({
            client_email: argv.email,
            private_key: argv.key,
            proxy: argv.proxy
        })
    }).command('bing', 'Submit crawler data to Bing Search Engine', (yargs) => {
        yargs.option('key', {
            type: 'string',
            alias: 'k',
            description: 'Your Bing apikey',
        }).demandOption(['key'], '\x1B[31mPlease provide key argument to work with bing submit!\x1B[0m')
            .example('$0 bing -key xxx', 'Submit to Bing')
            .example('$0 bing -k xxx', 'Simplely Submit to Bing')
    }, function (argv) {
        // begin bing submit
        bing_submit({
            apikey: argv.key,
            proxy: argv.proxy
        })
    }).command('baidu', 'Submit crawler data to Google Search Engine', (yargs) => {
        yargs.option('key', {
            type: 'string',
            alias: 'k',
            description: 'Your Baidu apikey',
        }).demandOption(['key'], '\x1B[31mPlease provide key argument to work with baidu submit!\x1B[0m')
            .example('$0 baidu -key xxx', 'Submit to Baidu')
            .example('$0 baidu -k xxx', 'Simplely Submit to Baidu')
    }, function (argv) {
        // begin baidu submit
        baidu_submit({
            apikey: argv.key,
            proxy: argv.proxy
        })
    })
    .demandCommand(1, 'You need at least one command before moving on')
    .strictCommands(true)
    .strictOptions(true)
    .example('$0 google --email xxx --key xxx', 'Submit to Google')
    .example('$0 google -e xxx -k xxx', 'Simplely Submit to Google')
    .example('$0 bing -key xxx', 'Submit to Bing')
    .example('$0 bing -k xxx', 'Simplely Submit to Bing')
    .example('$0 baidu -key xxx', 'Submit to Baidu')
    .example('$0 baidu -k xxx', 'Simplely Submit to Baidu')
    .option('proxy', {
        alias: 'p',
        type: 'string',
        description: 'Config proxy will be worked when requesting outside interface',
        example: 'http://localhost:1080'
    })
    .recommendCommands()
    .showHelpOnFail(true, '\x1B[33mSpecify --help for available options\nor you can check the docs: https://github.com/junpengzhou/hexo-seo-integrated-submit#readmet\x1B[0m')
    .help()
    .argv
