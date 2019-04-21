import mongoose from 'mongoose'
import { Tile, OPTIONS } from '../../schema.mjs'

const imageTileSchema = new mongoose.Schema({
  url: String,
  refreshTime: Number
}, OPTIONS)

export const ImageTile = Tile.discriminator('ImageTile', imageTileSchema)