# JSON CV's CLI

[![GitHub Releases](https://badgen.net/github/tag/jsoncv/cli)](https://github.com/jsoncv/cli/releases)
[![NPM Release](https://badgen.net/npm/v/@jsoncv/cli)](https://www.npmjs.com/package/@jsoncv/cli)

Command Line Interface (CLI) for interacting with JSON CVs.

- [Installation](#installation)
- [Validation using CLI](#validation-using-cli)

## Installation

```shell
npm install -g @jsoncv/cli
```

## Validation using CLI

Validating `cv.json`

```shell
jsoncv validate cv.json
# or
jsoncv validate https://example.com/cv.json
```

## Serving CV as Web Server

To serve your CV, you need to have a valid JSONCV template, as well as your CV in a valid [JSONCV format](https://www.npmjs.com/package/@jsoncv/schema).

You can store your CV on your computer, or access it from a URL.

```shell
# Loading locally hosted CV
jsoncv serve cv.json
# Loading CV from URL
jsoncv serve https://example.com/cv.json
```

By default, `jsoncv` assumes your current working directory also contains a valid template.
However, a template can be loaded from a separate location on your computer, or you can install a template using **_npm_**.

```shell
# Specifying the location of the template
jsoncv serve -t /path/to/template cv.json
# or using a template installed from npm
jsoncv serve -t name_of_the_template_package cv.json
```
