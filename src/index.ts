#!/usr/bin/env node

import { Command } from 'commander';
import { validator, server } from '@jsoncv/core'
import { isNil } from 'lodash'

const pkg = require('../package.json')
const program = new Command();

program
    .version(pkg.version);

program
    .command('validate [file]')
    .description('validates a JOSNCV file')
    .action((file:string) => {
        if (isNil(file)) {
            console.log('No Input')
        } else {
            console.log('Checking...\r')
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
