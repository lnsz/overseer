import fs from 'fs'
import path from 'path'

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const TILES_PATH = path.join(__dirname, '../tiles')

export const parseTileModules = async () => {
  const tileCategories = await fs.promises.readdir(TILES_PATH)
  const tiles = tileCategories.reduce(async (map, tileCategory) => {
    return map[tileCategory] = await fs.promises.readdir(path.join(TILES_PATH, tileCategory))
  }, Promise.resolve({}))
  return tiles
}