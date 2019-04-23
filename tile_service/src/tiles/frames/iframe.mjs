import mongoose from 'mongoose'
import { Tile, OPTIONS } from '../../schema.mjs'

const iframeTileSchema = new mongoose.Schema({
  zoom: Number,
  scrollable: Boolean
}, OPTIONS)

export const IframeTile = Tile.discriminator('IframeTile', iframeTileSchema)