[![Apache 2.0 license](https://img.shields.io/badge/license-Apache--2.0-green)](https://www.apache.org/licenses/LICENSE-2.0) [![npm version](https://badge.fury.io/js/screp-js-file.svg)](https://badge.fury.io/js/screp-js-file)

# screp-js-file

A pure Javascript version of [screp](https://github.com/icza/screp), a StarCraft: Remastered replay file parser, compiled from the original Go version using [GopherJS](https://github.com/gopherjs/gopherjs).

screp (StarCraft: Brood War Replay Parser) is a library for extracting information from StarCraft replay files. This library uses a compiled version of the original library recompiled for Javascript. This specific library is designed to for use in Node on local files—if you need to parse file buffers directly or use screp in the browser, try [screp-js](https://github.com/msikma/screp-js).

## Installation

This library can be installed through npm:

```
npm i --save screp-js-file
```

## Usage

To use, run `Screp.parseFile()` on a path to a local file.

```js
const Screp = require('screp-js-file')

const processRep(filepath) {
  try {
    const res = await Screp.parseFile(filepath)
    return res
  }
  catch (err) {
    // If something went wrong, 'err' will be an Error object containing a string thrown by Go.
    console.log(err)
  }
}
```

For more information, see the [screp-js](https://github.com/msikma/screp-js) documentation.

## Copyright

[Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0), as per the original [screp](https://github.com/icza/screp) project.
