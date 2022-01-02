# JSON CV's CLI

[![GitHub Releases](https://badgen.net/github/tag/jsoncv/cli)](https://github.com/jsoncv/cli/releases)
[![NPM Release](https://badgen.net/npm/v/@jsoncv/cli)](https://www.npmjs.com/package/@jsoncv/cli)

Command Line Interface (CLI) for interacting with JSON CVs.

- [Installation](#installation)
- [Validation using CLI](#validation-using-cli)
- [Exporting CV as HTML Document](#exporting-cv-as-html-document)
- [Serving CV as Web Server](#serving-cv-as-web-server)

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

## Exporting CV as HTML Document

To export your CV as a HTML document, you need to have a valid JSONCV template, as well as your CV in a valid [JSONCV format](https://www.npmjs.com/package/@jsoncv/schema).

You can store your CV on your computer, or access it from a URL.

```shell
# Loading locally hosted CV
jsoncv export cv.json
# Loading CV from URL
jsoncv export https://example.com/cv.json
```

By default, `jsoncv` assumes your current working directory also contains a valid template.
However, a template can be loaded from a separate location on your computer, or you can install a template using **_npm_**.

```shell
# Specifying the location of the template
jsoncv export -t /path/to/template cv.json
# or using a template installed from npm
jsoncv export -t name_of_the_template_package cv.json
```

## Serving CV as Web Server

You can serve your CV on a web service as well. Serving is mostly the same as exporting. You can swap the `export` command with `serve`.