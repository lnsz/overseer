const Tile = require('./schema')
const router  = require('express').Router()

// Fetch all tiles with dashboard_id
const fetchTiles = (req, res) => {
  Tile.find({ dashboard_id: req.params.dashboard_id }, (error, tiles) => {
    if (error) res.send({ error: error })
    res.send({ tiles: tiles })
  })
}

// Create a tile
const createTile = (req, res) => {
  new Tile({
    dashboard_id: req.params.dashboard_id, 
    name: req.body.name,
    url: req.body.url,
    description: req.body.description,
    updated: Date.now()
  }).save((error) => {
    if (error) res.send({ error: error })
    res.send({
      success: true,
      message: 'Tile created successfully'
    })
  })
}

// Update a tile
const updateTile = (req, res) => {
  Tile.findOne({
    _id: req.params.tile_id,
    dashboard_id: req.params.dashboard_id
  }, (error, tile) => {
    if (error) res.send({ error: error })
    const name = req.body.name
    const url = req.body.url
    const description = req.body.description
    if (name) tile.name = name
    if (url) tile.url = url
    if (description) tile.description = description
    tile.updated = Date.now()
    tile.save((error) => {
      if (error) res.send({ error: error })
      res.send({ success: true })
    })
  })
}

// Fetch single tile
const getTile = (req, res) => {
  Tile.findOne({
    _id: req.params.tile_id,
    dashboard_id: req.params.dashboard_id
  }, (error, tile) => {
    if (error) res.send({ error: error })
    res.send(tile)
  })
}

// Delete a tile
const deleteTile = (req, res) => {
  Tile.remove({
    _id: req.params.tile_id,
    dashboard_id: req.params.dashboard_id
  }, (error) => {
    if (error) res.send({ error: error })
    res.send({ success: true })
  })
}

router
  .get('/dashboards/:dashboard_id/tiles', fetchTiles)
  .get('/dashboards/:dashboard_id/tiles/:tile_id', getTile)
  .post('/dashboards/:dashboard_id/tiles', createTile)
  .put('/dashboards/:dashboard_id/tiles/:tile_id', updateTile)
  .delete('/dashboards/:dashboard_id/tiles/:tile_id', deleteTile)

module.exports = router