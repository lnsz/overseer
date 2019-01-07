const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TileSchema = new Schema({
  title: String,
  url: String,
  updated: Date
});

const Tile = mongoose.model("Tile", TileSchema);
module.exports = Tile;