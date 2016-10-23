#!/usr/bin/env node

const pangu = require('pangu')
const fse = require('fs-extra')
const program = require('commander')
const Promise = require('bluebird')
const pkg = require('../package.json')

// eslint-disable-next-line no-use-extend-native/no-use-extend-native
const fs = Promise.promisifyAll(fse)

program
  .version(pkg.version)
  .usage('<src> [dest]')
  .description('Typeset text which mixed Chinese and English')
  .parse(process.argv)

if (program.args.length <= 0) {
  program.help()
  process.exit(1)
}

const src = program.args[0]
const dest = program.args[1]
pangu.spacingFile(src)
  .then(data => {
    if (dest) {
      fs.outputFileAsync(dest, data)
    } else {
      console.log(data)
    }
  })
  .catch(err => {
    if (err.code === 'ENOENT') {
      console.log('No such file or directory')
    } else {
      console.error(err)
    }
    process.exit(1)
  })
