import mongoose from 'mongoose'
import { Tile, OPTIONS } from '../../schema.mjs'

const pieChartTileSchema = new mongoose.Schema({
  data: Object,
  options: Object
}, OPTIONS)

export const PieChartTile = Tile.discriminator('PieChartTile', pieChartTileSchema)