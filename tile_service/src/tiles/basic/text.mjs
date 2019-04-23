import mongoose from 'mongoose'
import { Tile, OPTIONS } from '../../schema.mjs'

const textTileSchema = new mongoose.Schema({
  text: String
}, OPTIONS)

export const TextTile = Tile.discriminator('TextTile', textTileSchema)