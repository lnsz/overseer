const Tile = require('./schema')
const router  = require('express').Router()

// Fetch all tiles with dashboard_id
const getTiles = (req, res) => {
  Tile.find({dashboard_id: req.params.dashboard_id}, (error, tiles) => {
    if (error) {
      console.error(error);
    }
    res.send({
      tiles: tiles
    })
  })
}

// Create a tile
const createTile = (req, res) => {
  new Tile({
    dashboard_id: req.params.dashboard_id, 
    title: req.body.title,
    url: req.body.url,
    description: req.body.description,
    updated: Date.now()
  }).save((error) => {
    if (error) {
      console.log(error)
    }
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
    if (error) {
      console.error(error)
    }
    const title = req.body.title
    const url = req.body.url
    const description = req.body.description
    if (title) tile.title = title
    if (url) tile.url = url
    if (description) tile.description = description
    tile.save((error) => {
      if (error) {
        console.log(error)
      }
      res.send({
        success: true
      })
    })
  })
}

// Fetch single tile
const fetchTile = (req, res) => {
  Tile.findOne({
    _id: req.params.tile_id,
    dashboard_id: req.params.dashboard_id
  }, (error, tile) => {
    if (error) {
      console.error(error)
    }
    res.send(tile)
  })
}

// Delete a tile
const deleteTile = (req, res) => {
  Tile.remove({
    _id: req.params.tile_id,
    dashboard_id: req.params.dashboard_id
  }, (error) => {
    if (error)
      res.send(error)
    res.send({
      success: true
    })
  })
}

router
  .get('/dashboards/:dashboard_id/tiles', getTiles)
  .get('/dashboards/:dashboard_id/tiles/:tile_id', fetchTile)
  .post('/dashboards/:dashboard_id/tiles', createTile)
  .put('/dashboards/:dashboard_id/tiles/:tile_id', updateTile)
  .delete('/dashboards/:dashboard_id/tiles/:tile_id', deleteTile)

module.exports = router