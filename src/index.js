// screp-js-file <https://github.com/msikma/screp-js-file>
// © Apache 2.0 license

const fs = require('fs').promises
const Screp = require('screp-js')

/** Output transformation options: primarily for debugging. Undocumented and unsupported. */
const transformDefaults = {
  _doTransform: true,
  _doFilter: true,
  _doRoundtrip: false
}

function ScrepFs() {
  /**
   * Parses a replay file and returns its data.
   * 
   * This just reads the file into a buffer and then passes it on to screp-js.
   */
  async function parseFile(filepath, userOptions = {}, readFileOptions = {}, _transformOptions = {}) {
    const transformOptions = {...transformDefaults, ..._transformOptions}
    const options = Screp.resolveOptions(userOptions, true)
    const file = await fs.readFile(filepath, {encoding: null, ...readFileOptions})
    return Screp.parseBuffer(file, options, transformOptions)
  }
  
  return {
    parseFile,
    resolveOptions: Screp.resolveOptions,
    parseBuffer: Screp.parseBuffer,
    getVersion: Screp.getVersion,
    getVersionObject: Screp.getVersionObject
  }
}

module.exports = ScrepFs()
