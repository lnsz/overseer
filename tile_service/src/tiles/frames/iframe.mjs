import mongoose from 'mongoose'
import { Tile, OPTIONS } from '../../schema.mjs'

const iframeTileSchema = new mongoose.Schema({
  url: String,
  refreshTime: Number,
  zoom: Number,
  scrollable: Boolean
}, OPTIONS)

export const IframeTile = Tile.discriminator('IframeTile', iframeTileSchema)