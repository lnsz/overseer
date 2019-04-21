import mongoose from 'mongoose'
import { Tile, OPTIONS } from '../../schema.mjs'

const statusTileSchema = new mongoose.Schema({
  state: {
    type: String,
    enum: ['online', 'offline', ''] 
  }
}, OPTIONS)

export const StatusTile = Tile.discriminator('StatusTile', statusTileSchema)