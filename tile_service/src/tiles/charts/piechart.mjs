import mongoose from 'mongoose'
import { Tile, OPTIONS } from '../../schema.mjs'

const pieChartTileSchema = new mongoose.Schema({
  url: String,
  refreshTime: Number,
  data: Object,
  options: Object
}, OPTIONS)

export const PieChartTile = Tile.discriminator('PieChartTile', pieChartTileSchema)