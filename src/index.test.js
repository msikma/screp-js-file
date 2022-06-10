// screp-js <https://github.com/msikma/screp-js>
// © Apache 2.0 license

const fs = require('fs').promises
const path = require('path')
const {promisify} = require('node:util')
const {unzip} = require('node:zlib')
const Screp = require('./index')

/** Promisified version of unzip(). */
const unzipP = promisify(unzip)

/** Test replay files by Light. */
const repFiles = [
  '3307 EverPJayP ErOsLightT.rep'
]

/** Options for getting the complete output. */
const optionsFull = {
  mapData: true,
  mapTiles: true,
  mapResLoc: true,
  cmds: true
}

/**
 * Parses a replay file with screp and returns its data.
 */
const parseRepFile = async (file, options = optionsFull, transformOptions = {}) => {
  const filepath = path.resolve(path.join(__dirname, '..', 'test', `${file}.gz`))
  const data = await unzipP(await fs.readFile(filepath, {encoding: null}))
  const res = Screp.parseBuffer(data, options, transformOptions)

  return res
}

/**
 * Returns the parsed JSON data from a .rep.json file.
 */
const getRepJSON = async file => {
  const filepath = path.resolve(path.join(__dirname, '..', 'test', `${file}.json.gz`))
  const buffer = await unzipP(await fs.readFile(filepath, {encoding: null}))
  return JSON.parse(buffer)
}

describe(`screp-js-file package`, () => {
  describe(`Screp.parseFile()`, () => {
    it('correctly parses local replay files', async () => {
      for (const repFile of repFiles) {
        const repData = JSON.parse(JSON.stringify(await parseRepFile(repFile)))
        const expectedData = await getRepJSON(repFile)
        expect(repData).toEqual(expectedData)
      }
    })
  })
})
