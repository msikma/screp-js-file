// screp-js-file <https://github.com/msikma/screp-js-file>
// © Apache 2.0 license

const fs = require('fs').promises
const Screp = require('screp-js')

/** Default settings for what values to include in the output. */
const optionDefaults = {
  header: true,
  computed: true,
  mapData: false,
  mapTiles: false,
  mapResLoc: false,
  cmds: false,
  rawData: false
}

function ScrepFs() {
  /**
   * Parses a replay file and returns its data.
   * 
   * This just reads the file into a buffer and then passes it on to screp-js.
   */
  async function parseFile(filepath, userOptions = {}, readFileOptions = {}) {
    const options = {...optionDefaults, ...userOptions}
    const file = await fs.readFile(filepath, {encoding: null, ...readFileOptions})
    return Screp.parseBuffer(file, options)
  }
  
  return {
    parseFile,
    parseBuffer: Screp.parseBuffer,
    getVersion: Screp.getVersion,
    getVersionObject: Screp.getVersionObject
  }
}

module.exports = ScrepFs()
