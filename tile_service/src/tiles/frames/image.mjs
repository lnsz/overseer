import mongoose from 'mongoose'
import { Tile, OPTIONS } from '../../schema.mjs'

const imageTileSchema = new mongoose.Schema({
  zoom: Number
}, OPTIONS)

export const ImageTile = Tile.discriminator('ImageTile', imageTileSchema)