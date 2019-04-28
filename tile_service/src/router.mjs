import { Tile } from './schema.mjs'
import express from 'express'
import axios from 'axios'
import { parseTileModules } from './utils/tileModuleParser.mjs'

const fetchTileTypes = async (req, res) => {
  const tiles = await parseTileModules()
  res.send(tiles)
}

// Fetch all tiles with dashboard_id
const fetchTiles = (req, res) => {
  Tile.find({ dashboard_id: req.params.dashboard_id }, (error, tiles) => {
    if (error || !tiles) {
      console.log(error)
      res.status(500).send(error)
      return
    }
    tiles.forEach(tile =>  {
      // TODO: Replace this
      if (tile.type === 'status' && 
        (((Date.now() - tile.updated.getTime()) / 60000 > 1) || !tile.status.state)
      ) {
        axios.get(tile.url)
          .then(() => tile.status.state = "online")
          .catch(() => tile.status.state = "offline")
          .then(() => {
            tile.updated = Date.now()
            tile.save(error => {
              if (error) {
                console.log(error)
                res.status(500).send(error)
                return
              }
            })
          })
      }
    })
    res.send({ tiles: tiles })
  })
}

// Create a tile
const createTile = (req, res) => {
  new Tile({
    dashboard_id: req.params.dashboard_id, 
    ...req.body,
    updated: Date.now()
  }).save(error => {
    if (error) {
      console.log(error)
      res.status(500).send(error)
      return
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
    if (error || !tile) {
      console.log(error)
      res.status(500).send(error)
      return
    }
    Object.keys(req.body).forEach( key => { if (req.body) tile[key] = req.body[key] } )
    tile.updated = Date.now()
    tile.save(error => {
      if (error) {
        console.log(error)
        res.status(500).send(error)
        return
      }
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
    if (error) {
      console.log(error)
      res.status(500).send(error)
      return
    }
    res.send(tile)
  })
}

// Delete a tile
const deleteTile = (req, res) => {
  Tile.remove({
    _id: req.params.tile_id,
    dashboard_id: req.params.dashboard_id
  }, error => {
    if (error) {
      console.log(error)
      res.status(500).send(error)
      return
    }
    res.send({ success: true })
  })
}

export default express.Router()
  .get('/tiles/types', fetchTileTypes)
  .get('/dashboards/:dashboard_id/tiles', fetchTiles)
  .get('/dashboards/:dashboard_id/tiles/:tile_id', getTile)
  .post('/dashboards/:dashboard_id/tiles', createTile)
  .put('/dashboards/:dashboard_id/tiles/:tile_id', updateTile)
  .delete('/dashboards/:dashboard_id/tiles/:tile_id', deleteTile)