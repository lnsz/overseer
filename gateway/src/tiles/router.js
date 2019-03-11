const router = require('express').Router()
const axios = require('axios')
const tileService = `http://${process.env.TILE_SERVICE_IP}:${process.env.TILE_SERVICE_HP}`

// Fetch all tiles with dashboard_id
const fetchTiles = (req, res) => {
  axios.get(`${tileService}${req.originalUrl}`)
    .then((response) => {
      res.send(response.data)
    })
    .catch((error) => {
      console.log(error)
      res.status(500).send(error)
    })
}

// Create a tile
const createTile = (req, res) => {
  axios.post(`${tileService}${req.originalUrl}`, req.body)
    .then((response) => {
      res.send(response.data)
    })
    .catch((error) => {
      console.log(error)
      res.status(500).send(error)
    })
}

// Update a tile
const updateTile = (req, res) => {
  axios.put(`${tileService}${req.originalUrl}`, req.body)
    .then((response) => {
      res.send(response.data)
    })
    .catch((error) => {
      console.log(error)
      res.status(500).send(error)
    })
}

// Fetch single tile
const getTile = (req, res) => {
  axios.get(`${tileService}${req.originalUrl}`)
    .then((response) => {
      res.send(response.data)
    })
    .catch((error) => {
      console.log(error)
      res.status(500).send(error)
    })
}

// Delete a tile
const deleteTile = (req, res) => {
  axios.delete(`${tileService}${req.originalUrl}`)
    .then((response) => {
      res.send(response.data)
    })
    .catch((error) => {
      console.log(error)
      res.status(500).send(error)
    })
}

router
  .get('/dashboards/:dashboard_id/tiles', fetchTiles)
  .get('/dashboards/:dashboard_id/tiles/:tile_id', getTile)
  .post('/dashboards/:dashboard_id/tiles', createTile)
  .put('/dashboards/:dashboard_id/tiles/:tile_id', updateTile)
  .delete('/dashboards/:dashboard_id/tiles/:tile_id', deleteTile)

module.exports = router