import mongoose from 'mongoose'
import { Tile, OPTIONS } from '../../schema.mjs'

const textTileSchema = new mongoose.Schema({
  url: String,
  refreshTime: Number,
  text: String
}, OPTIONS)

export const TextTile = Tile.discriminator('TextTile', textTileSchema)