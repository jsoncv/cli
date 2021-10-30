#!/usr/bin/env node

import { Command } from 'commander';
import { validator } from '@jsoncv/core'
import { isNil } from 'lodash'
import fs from 'fs'
import { cwd } from 'process';
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

program
    .command('serve [cv]')
    .option('-t, --template <location>', 'Location of the template', './')
    .option('-p, --port <port>', 'Serving port', '2314')
    .description('Serves the CV as a web service')
    .action((cv:string, options) => {
        const isTemplateLocationAbsolute = options.template.startsWith('/')
        const templateModuleLocation = isTemplateLocationAbsolute ? `${options.template}` : `${cwd()}/${options.template}`
        import(`${templateModuleLocation}/index.js`)
            .then(templateModule => {
                console.log(`Running on http://localhost:${options.port}`)

                const listener:RequestListener = (req:IncomingMessage, res:ServerResponse) => {
                    res.writeHead(200, { 'content-type': 'text/html' })
                    const cvText = fs.readFileSync(cv).toString()
                    const cvJson = JSON.parse(cvText)
                    res.write('<pre>')
                    res.write(templateModule.render(cvJson))
                    res.write('</pre>')
                    res.end()
                }
                const server = http.createServer(listener)
                server.listen(options.port)
            })
            .catch(err => {
                if (err.code === 'MODULE_NOT_FOUND') {
                    console.log('The template is not valid!')
                } else {
                    console.log(err)
                }
            })
    }).addHelpText('after', `
Examples:
  $ jsoncv serve cv.json`
);

program.parse(process.argv);
