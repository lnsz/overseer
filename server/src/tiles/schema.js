const mongoose = require("mongoose")
const Schema = mongoose.Schema

const TileSchema = new Schema({
  dashboard_id: { type: Schema.ObjectId, ref: 'Dashboard' },
  name: String,
  url: String,
  description: String,
  updated: Date
})

const Tile = mongoose.model("Tile", TileSchema)
module.exports = Tile