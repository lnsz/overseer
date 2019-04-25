import fs from 'fs'
import path from 'path'

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const TILES_PATH = path.join(__dirname, '../tiles')

export const parseTileModules = () => {
  let tiles = []
  fs.readdir(TILES_PATH, (err, files) => {
    if (err) {
      return tiles
    }
    files.forEach((file) => {
      tiles.push(file)
    })
  })
  console.log(tiles)
  return tiles
}