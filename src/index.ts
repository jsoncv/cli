#!/usr/bin/env node

import { Command } from 'commander';
import { validator, server } from '@jsoncv/core'
import { isNil } from 'lodash'
import fs from 'fs'
import { cwd } from 'process'
import http, {IncomingMessage, RequestListener, ServerResponse} from 'http'

const pkg = require('../package.json')
const program = new Command();

program
    .version(pkg.version);

program
    .command('validate [file]')
    .description('validate a JOSN CV file')
    .action((file:string) => {
        if (isNil(file)) {
            console.log('No Input')
        } else {
            console.log('Checking...\r')
            // TODO: Validator (Loading Data) should work on URL and File
            // It is not tested or implemented in URL, It is already working in File
            validator(file)
                .then(() => {
                    console.log('CV is valid.')
                })
                .catch((errors:any) => {
                    console.log('CV is not valid! Errors:')
                    console.log(errors)
                })
        }
    }).addHelpText('after', `
Examples:
  $ jsoncv validate cv.json`
);

program
    .command('serve [cv]')
    .option('-t, --template <location>', 'Location of the template', './')
    .option('-p, --port <port>', 'Serving port', '2314')
    .description('Serves the CV as a web service')
    .action((cv:string, options) => {
        // TODO: Validator (Loading Data) should work on URL and File
        // It is not tested or implemented in URL, It is already working in File
        validator(cv)
            .then(() => {
                server.serve(options.template, cv, options.port)
            })
            .catch(() => {
                console.log('CV is not valid!')
                console.log('Make sure to provide a valid JSONCV file.')
                console.log(`Try \`jsoncv validate ${cv}\` for more detail.`)
            })
    }).addHelpText('after', `
Examples:
  $ jsoncv serve cv.json`
);

program.parse(process.argv);
