var shapefile = require('shapefile')
const { createWriteStream } = require('fs')
;(async function () {
  const source = await shapefile.open('shape-data/tl_2019_us_zcta510.shp')
  const sqlFile = createWriteStream('./dist/out.js')
  await sqlFile.write(`module.exports = {`)
  await source.read().then(function log(result) {
    if (result.done) return sqlFile.write('}')
    if (!result?.value?.properties.GEOID10) return
    const coordinates =
      result.value.geometry.type === 'Polygon'
        ? result.value.geometry.coordinates.flat(1)
        : result.value.geometry.coordinates.flat(2)

    if (!coordinates.length) throw new Error(`no coordinates for  ${result?.value.properties?.GEOID10}`)
    const [firstX, firstY] = coordinates[0]
    let w = firstX
    let e = firstX
    let n = firstY
    let s = firstY
    for (const pt of coordinates) {
      const [x, y] = pt
      if (x < w) w = x
      if (x > e) e = x
      if (y > n) n = y
      if (y < s) s = y
    }
    sqlFile.write(`${result?.value.properties?.GEOID10}: ${JSON.stringify({ n, s, e, w })},`)
    return source.read().then(log)
  })
})()
