import fs from 'fs'
import path from 'path'

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const TILES_PATH = path.join(__dirname, '../tiles')

const getTileModule = async (tileFile) => {
  return {
    name: path.basename(tileFile, '.mjs')
  }
}

export const parseTileModules = async () => {
  const tileCategories = await fs.promises.readdir(TILES_PATH)
  let tileModules = {}
  for (const tileCategory of tileCategories) {
    const tileFiles = await fs.promises.readdir(path.join(TILES_PATH, tileCategory))
    tileModules[tileCategory] = await Promise.all(
      tileFiles.map(async tileFile => {
        return await getTileModule(path.join(TILES_PATH, tileCategory, tileFile))
      })
    )
  }
  return tileModules
}