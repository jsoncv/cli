#!/usr/bin/env node

import { Command } from 'commander';
import { validator } from '@jsoncv/core'
import { isNil } from 'lodash'

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
            try {
                const cwd = process.cwd()
                const cv = require(`${cwd}/${file}`)
                console.log('Checking...\r')
                validator(cv)
            } catch (e) {
                if (e.code === 'MODULE_NOT_FOUND') {
                    console.log('Error: File not found')
                } else {
                    console.log(e)
                }
            }
        }
    }).addHelpText('after', `
Examples:
  $ jsoncv validate cv.json`
);

program.parse(process.argv);
