#!/usr/bin/env node
const yargs = require('yargs')
const google_submit = require('./google_submit')
const bing_submit = require('./bing_submit')
const baidu_submit = require('./baidu_submit')

yargs
    .scriptName("hexo-sis")
    .usage('Useage: $0 <cmd> [args]')
    .command('google [email] [key]', 'Submit crawlye data to Google Search Engine', (yargs) => {
        yargs.positional('email', {
            type: 'string',
            default: '',
            alias: 'e',
            describe: 'The Email is your acount\'s username to login Google Search Console',
        }).positional('key', {
            type: 'string',
            default: '',
            alias: 'k',
            describe: 'Your Google client private key',
        }).demandOption(['email', 'key'])
            .example('hxeo-sis google --email xxx --key xxx', 'Submit to Google')
            .example('hxeo-sis google -e xxx -k xxx', 'Simplely Submit to Google')
    }, function (argv) {
        // begin google submit
        google_submit({
            client_email: argv.email,
            private_key: argv.key,
            proxy: argv.proxy
        })
    }).command('bing [key]', 'Submit crawlye data to Bing Search Engine', (yargs) => {
        yargs.positional('key', {
            type: 'string',
            default: '',
            alias: 'k',
            describe: 'Your Bing apikey',
        }).example('hxeo-sis bing -key xxx', 'Submit to Bing')
            .example('hxeo-sis bing -k xxx', 'Simplely Submit to Bing')
    }, function (argv) {
        // begin bing submit
        bing_submit({
            apikey: argv.key,
            proxy: argv.proxy
        })
    }).command('baidu [key]', 'Submit crawlye data to Google Search Engine', (yargs) => {
        yargs.positional('key', {
            type: 'string',
            default: '',
            alias: 'k',
            describe: 'Your Baidu apikey',
        }).example('hxeo-sis baidu -key xxx', 'Submit to Baidu')
            .example('hxeo-sis baidu -k xxx', 'Simplely Submit to Baidu')
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
    .example('hxeo-sis google --email xxx --key xxx', 'Submit to Google')
    .example('hxeo-sis google -e xxx -k xxx', 'Simplely Submit to Google')
    .example('hxeo-sis bing -key xxx', 'Submit to Bing')
    .example('hxeo-sis bing -k xxx', 'Simplely Submit to Bing')
    .example('hxeo-sis baidu -key xxx', 'Submit to Baidu')
    .example('hxeo-sis baidu -k xxx', 'Simplely Submit to Baidu')
    .option('proxy', {
        alias: 'p',
        type: 'string',
        describe: 'config a proxy',
        example: 'http://localhost:1080'
    })
    .recommendCommands()
    .showHelpOnFail(true, 'Specify --help for available options')
    .help()
    .argv
