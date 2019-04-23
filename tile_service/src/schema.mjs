import mongoose from 'mongoose'
import {
  LAYOUT_TYPE,
  STYLE_TYPE,
  INTEGRATION_TYPE
} from './utils/types.mjs'

export const OPTIONS = { discriminatorKey: 'type' }

const tileSchema = new mongoose.Schema({
  dashboard_id: String,
  name: String,
  description: String,
  creator: String,
  updated: Date,
  layout: LAYOUT_TYPE,
  style: STYLE_TYPE,
  integration: INTEGRATION_TYPE
}, OPTIONS)

export const Tile = mongoose.model("Tile", tileSchema)